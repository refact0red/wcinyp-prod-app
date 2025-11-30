"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { appSidebarData } from "@/components/shadcn/app-sidebar";

type HistoryEntry = {
  path: string;
  root: string | null;
};

type HistoryState = {
  entries: HistoryEntry[];
  index: number;
};

type HistoryAction =
  | { type: "push"; entry: HistoryEntry }
  | { type: "setIndex"; index: number };

type HistoryContextValue = {
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
};

const HistoryContext = createContext<HistoryContextValue | undefined>(undefined);

const sidebarRoots: string[] = [
  ...appSidebarData.navMain.map((item) => item.url),
  ...appSidebarData.documents.map((item) => item.url),
  ...appSidebarData.admin.map((item) => item.url),
].filter(Boolean);

function getRootForPath(path: string): string | null {
  const effectivePath = path === "/" ? "/dashboard" : path;

  let bestMatch: string | null = null;

  for (const root of sidebarRoots) {
    if (!root) continue;
    if (!effectivePath.startsWith(root)) continue;

    if (!bestMatch || root.length > bestMatch.length) {
      bestMatch = root;
    }
  }

  return bestMatch;
}

const initialHistoryState: HistoryState = {
  entries: [],
  index: -1,
};

function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
  switch (action.type) {
    case "push": {
      const currentEntry = state.index >= 0 ? state.entries[state.index] : undefined;
      if (currentEntry && currentEntry.path === action.entry.path) {
        return state;
      }

      const nextEntries = state.entries.slice(0, state.index + 1);
      nextEntries.push(action.entry);

      return {
        entries: nextEntries,
        index: nextEntries.length - 1,
      };
    }
    case "setIndex":
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
}

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(historyReducer, initialHistoryState);
  const isNavigatingRef = useRef(false);

  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!pathname) return;

    const root = getRootForPath(pathname);
    const currentPath = search ? `${pathname}?${search}` : pathname;

    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }

    dispatch({ type: "push", entry: { path: currentPath, root } });
  }, [pathname, search]);

  const canGoBack = useMemo(() => {
    if (state.index <= 0 || !state.entries[state.index]) return false;

    const currentRoot = state.entries[state.index].root;
    const previousEntry = state.entries[state.index - 1];

    if (!previousEntry) return false;

    return previousEntry.root === currentRoot && !!previousEntry.path;
  }, [state.entries, state.index]);

  const canGoForward = useMemo(() => {
    if (state.index < 0) return false;

    const currentEntry = state.entries[state.index];
    const nextEntry = state.entries[state.index + 1];

    if (!currentEntry || !nextEntry) return false;

    return nextEntry.root === currentEntry.root && !!nextEntry.path;
  }, [state.entries, state.index]);

  const goBack = useCallback(() => {
    if (!canGoBack || state.index <= 0) return;

    const targetIndex = state.index - 1;
    const target = state.entries[targetIndex];
    if (!target || !target.path) return;

    isNavigatingRef.current = true;
    dispatch({ type: "setIndex", index: targetIndex });
    router.push(target.path);
  }, [canGoBack, router, state.entries, state.index]);

  const goForward = useCallback(() => {
    if (!canGoForward) return;

    const targetIndex = state.index + 1;
    const target = state.entries[targetIndex];
    if (!target || !target.path) return;

    isNavigatingRef.current = true;
    dispatch({ type: "setIndex", index: targetIndex });
    router.push(target.path);
  }, [canGoForward, router, state.entries, state.index]);

  const value = useMemo(
    () => ({
      canGoBack,
      canGoForward,
      goBack,
      goForward,
    }),
    [canGoBack, canGoForward, goBack, goForward]
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}

export function useScopedHistory() {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useScopedHistory must be used within a HistoryProvider");
  }

  return context;
}

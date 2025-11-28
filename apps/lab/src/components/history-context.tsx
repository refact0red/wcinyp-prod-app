"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { appSidebarData } from "@/components/shadcn/app-sidebar";

type HistoryEntry = {
  path: string;
  root: string | null;
};

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

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [index, setIndex] = useState<number>(-1);

  const isNavigatingRef = useRef(false);
  const indexRef = useRef<number>(-1);

  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!pathname) return;

    const root = getRootForPath(pathname);
    const currentPath = search ? `${pathname}?${search}` : pathname;

    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }

    setEntries((prev) => {
      const currentIndex = indexRef.current;
      const currentEntry = currentIndex >= 0 ? prev[currentIndex] : undefined;

      if (currentEntry && currentEntry.path === currentPath) {
        return prev;
      }

      const nextEntries = prev.slice(0, currentIndex + 1);
      nextEntries.push({ path: currentPath, root });

      const nextIndex = nextEntries.length - 1;
      indexRef.current = nextIndex;
      setIndex(nextIndex);

      return nextEntries;
    });
  }, [pathname, search]);

  const canGoBack = useMemo(() => {
    if (index <= 0 || !entries[index]) return false;

    const currentRoot = entries[index].root;
    const previousEntry = entries[index - 1];

    if (!previousEntry) return false;

    return previousEntry.root === currentRoot && !!previousEntry.path;
  }, [entries, index]);

  const canGoForward = useMemo(() => {
    if (index < 0) return false;

    const currentEntry = entries[index];
    const nextEntry = entries[index + 1];

    if (!currentEntry || !nextEntry) return false;

    return nextEntry.root === currentEntry.root && !!nextEntry.path;
  }, [entries, index]);

  const goBack = () => {
    if (!canGoBack || index <= 0) return;

    const target = entries[index - 1];
    if (!target || !target.path) return;

    isNavigatingRef.current = true;
    indexRef.current = index - 1;
    setIndex(index - 1);
    router.push(target.path);
  };

  const goForward = () => {
    if (!canGoForward) return;

    const target = entries[index + 1];
    if (!target || !target.path) return;

    isNavigatingRef.current = true;
    indexRef.current = index + 1;
    setIndex(index + 1);
    router.push(target.path);
  };

  const value = useMemo(
    () => ({
      canGoBack,
      canGoForward,
      goBack,
      goForward,
    }),
    [canGoBack, canGoForward]
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

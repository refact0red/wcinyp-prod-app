import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  RowSelectionState,
  SortingState,
  Table,
  TableMeta,
  TableOptions,
  TableState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  defaultColumnResizeMode,
  defaultColumnSizing,
  defaultPageSize,
  defaultTableState,
} from "@/components/table/table-config"

// TODO: For browser-only state (localStorage, matchMedia, etc.),
// keep SSR + initial client render deterministic, then layer
// persisted state on in useEffect. If we ever want persisted
// table layout on first paint, consider moving persistence to
// a server-readable source (e.g. cookies) and feeding it into
// initialState so SSR and CSR see the same data.

export type PersistableState = Pick<
  TableState,
  | "sorting"
  | "columnFilters"
  | "columnVisibility"
  | "globalFilter"
  | "pagination"
  | "columnPinning"
  | "columnOrder"
  | "columnSizing"
>

type UseDataTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  stateKey?: string
  getRowId?: TableOptions<TData>["getRowId"]
  pageCount?: number
  manualPagination?: boolean
  manualSorting?: boolean
  manualFiltering?: boolean
  enableRowSelection?: boolean
  meta?: TableMeta<TData>
  initialState?: Partial<TableState>
  onStateChange?: (state: PersistableState) => void
}

type TableStateShape = PersistableState & {
  rowSelection: RowSelectionState
}

type TableAction =
  | {
      type: "set"
      key: keyof TableStateShape
      updater: React.SetStateAction<TableStateShape[keyof TableStateShape]>
    }
  | { type: "hydrate"; payload: PersistableState | null; initialState?: Partial<TableState> }
  | { type: "reset"; initialState?: Partial<TableState> }

function resolveUpdater<T>(updater: React.SetStateAction<T>, prev: T): T {
  return typeof updater === "function" ? (updater as (value: T) => T)(prev) : updater
}

function buildState({
  initialState,
  persisted,
}: {
  initialState?: Partial<TableState>
  persisted?: PersistableState | null
}): TableStateShape {
  return {
    sorting: persisted?.sorting ?? initialState?.sorting ?? [],
    columnFilters: persisted?.columnFilters ?? initialState?.columnFilters ?? [],
    columnVisibility: persisted?.columnVisibility ?? initialState?.columnVisibility ?? {},
    globalFilter:
      (persisted?.globalFilter as string | undefined) ??
      (initialState?.globalFilter as string | undefined) ??
      "",
    pagination:
      persisted?.pagination ??
      initialState?.pagination ?? {
        pageIndex: defaultTableState.pagination?.pageIndex ?? 0,
        pageSize: defaultTableState.pagination?.pageSize ?? defaultPageSize,
      },
    columnPinning: persisted?.columnPinning ?? initialState?.columnPinning ?? { right: [] },
    columnOrder: persisted?.columnOrder ?? initialState?.columnOrder ?? [],
    columnSizing: persisted?.columnSizing ?? initialState?.columnSizing ?? {},
    rowSelection: {},
  }
}

function tableStateReducer(
  state: TableStateShape,
  action: TableAction
): TableStateShape {
  switch (action.type) {
    case "hydrate":
      return buildState({ initialState: action.initialState, persisted: action.payload })
    case "reset":
      return buildState({ initialState: action.initialState })
    case "set":
      return {
        ...state,
        [action.key]: resolveUpdater(action.updater, state[action.key]),
      }
    default:
      return state
  }
}

function readPersistedState(key?: string): PersistableState | null {
  if (!key || typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as PersistableState) : null
  } catch {
    return null
  }
}

function writePersistedState(key: string, value: PersistableState) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* no-op */
  }
}

function clearPersistedState(key?: string) {
  if (!key || typeof window === "undefined") return
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* no-op */
  }
}

export function useDataTable<TData>({
  data,
  columns,
  stateKey,
  getRowId,
  pageCount,
  manualFiltering,
  manualPagination,
  manualSorting,
  enableRowSelection = true,
  meta,
  initialState,
  onStateChange,
}: UseDataTableProps<TData>) {
  const initialStateKey = React.useMemo(
    () => (initialState ? JSON.stringify(initialState) : "no-initial-state"),
    [initialState]
  )
  const initialStateMemo = React.useMemo(() => initialState, [initialStateKey])
  const [hasMounted, setHasMounted] = React.useState(false)
  const [hasHydrated, setHasHydrated] = React.useState(!stateKey)

  const [tableState, dispatch] = React.useReducer(
    tableStateReducer,
    buildState({ initialState: initialStateMemo })
  )

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  React.useEffect(() => {
    if (!stateKey || !hasMounted) {
      setHasHydrated(true)
      return
    }

    const persisted = readPersistedState(stateKey)
    dispatch({ type: "hydrate", payload: persisted, initialState: initialStateMemo })
    setHasHydrated(true)
  }, [stateKey, hasMounted, initialStateMemo])

  const resetState = React.useCallback(() => {
    dispatch({ type: "reset", initialState: initialStateMemo })
    clearPersistedState(stateKey)
  }, [initialStateMemo, stateKey])

  React.useEffect(() => {
    if (!stateKey || !hasHydrated) return
    const { rowSelection, ...persistable } = tableState
    writePersistedState(stateKey, persistable)
  }, [stateKey, hasHydrated, tableState])

  React.useEffect(() => {
    if (!onStateChange) return
    const { rowSelection, ...persistable } = tableState
    onStateChange(persistable)
  }, [onStateChange, tableState])

  const table = useReactTable({
    data,
    columns,
    state: tableState,
    defaultColumn: defaultColumnSizing,
    columnResizeMode: defaultColumnResizeMode,
    enableRowSelection,
    enableColumnResizing: true,
    onSortingChange: (updater) => dispatch({ type: "set", key: "sorting", updater }),
    onColumnFiltersChange: (updater) =>
      dispatch({ type: "set", key: "columnFilters", updater }),
    onColumnVisibilityChange: (updater) =>
      dispatch({ type: "set", key: "columnVisibility", updater }),
    onGlobalFilterChange: (updater) =>
      dispatch({ type: "set", key: "globalFilter", updater }),
    onRowSelectionChange: (updater) =>
      dispatch({ type: "set", key: "rowSelection", updater }),
    onColumnPinningChange: (updater) =>
      dispatch({ type: "set", key: "columnPinning", updater }),
    onColumnOrderChange: (updater) =>
      dispatch({ type: "set", key: "columnOrder", updater }),
    onColumnSizingChange: (updater) =>
      dispatch({ type: "set", key: "columnSizing", updater }),
    onPaginationChange: (updater) =>
      dispatch({ type: "set", key: "pagination", updater }),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount,
    getRowId,
    meta,
  })

  const selectionCount = table.getFilteredSelectedRowModel().rows.length
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter ||
    table.getState().sorting.length > 0

  return {
    table,
    resetState,
    selectionCount,
    isFiltered,
  }
}

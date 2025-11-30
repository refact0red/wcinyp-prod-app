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
  const [isPersistenceReady, setIsPersistenceReady] = React.useState(false)

  const [sorting, setSorting] = React.useState<SortingState>(
    initialState?.sorting ?? []
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialState?.columnFilters ?? []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  )
  const [globalFilter, setGlobalFilter] = React.useState<string>(
    (initialState?.globalFilter as string | undefined) ?? ""
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    initialState?.columnPinning ?? { right: [] }
  )
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    initialState?.columnOrder ?? []
  )
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>(
    initialState?.columnSizing ?? {}
  )
  const [pagination, setPagination] = React.useState(
    initialState?.pagination ?? {
      pageIndex: defaultTableState.pagination?.pageIndex ?? 0,
      pageSize: defaultTableState.pagination?.pageSize ?? defaultPageSize,
    }
  )

  React.useEffect(() => {
    if (!stateKey) {
      setIsPersistenceReady(true)
      return
    }

    const persisted = readPersistedState(stateKey)

    if (persisted) {
      setSorting(persisted.sorting ?? initialState?.sorting ?? [])
      setColumnFilters(persisted.columnFilters ?? initialState?.columnFilters ?? [])
      setColumnVisibility(
        persisted.columnVisibility ?? initialState?.columnVisibility ?? {}
      )
      setGlobalFilter(
        (persisted.globalFilter as string | undefined) ??
          (initialState?.globalFilter as string | undefined) ??
          ""
      )
      setColumnPinning(
        persisted.columnPinning ?? initialState?.columnPinning ?? { right: [] }
      )
      setColumnOrder(persisted.columnOrder ?? initialState?.columnOrder ?? [])
      setColumnSizing(persisted.columnSizing ?? initialState?.columnSizing ?? {})
      setPagination(
        persisted.pagination ??
          initialState?.pagination ?? {
            pageIndex: defaultTableState.pagination?.pageIndex ?? 0,
            pageSize: defaultTableState.pagination?.pageSize ?? defaultPageSize,
          }
      )
    }

    setIsPersistenceReady(true)
  }, [stateKey])

  const resetState = React.useCallback(() => {
    setSorting(initialState?.sorting ?? [])
    setColumnFilters(initialState?.columnFilters ?? [])
    setColumnVisibility(initialState?.columnVisibility ?? {})
    setGlobalFilter(
      (initialState?.globalFilter as string | undefined) ?? ""
    )
    setColumnPinning(initialState?.columnPinning ?? { right: [] })
    setColumnOrder(initialState?.columnOrder ?? [])
    setColumnSizing(initialState?.columnSizing ?? {})
    setPagination(
      initialState?.pagination ?? {
        pageIndex: defaultTableState.pagination?.pageIndex ?? 0,
        pageSize: defaultTableState.pagination?.pageSize ?? defaultPageSize,
      }
    )
    setRowSelection({})
    clearPersistedState(stateKey)
  }, [initialState, stateKey])

  React.useEffect(() => {
    if (!stateKey || !isPersistenceReady) return
    const value: PersistableState = {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination,
      columnPinning,
      columnOrder,
      columnSizing,
    }
    writePersistedState(stateKey, value)
  }, [
    stateKey,
    isPersistenceReady,
    sorting,
    columnFilters,
    columnVisibility,
    globalFilter,
    pagination,
    columnPinning,
    columnOrder,
    columnSizing,
  ])

  React.useEffect(() => {
    if (!onStateChange) return
    onStateChange({
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination,
      columnPinning,
      columnOrder,
      columnSizing,
    })
  }, [
    onStateChange,
    sorting,
    columnFilters,
    columnVisibility,
    globalFilter,
    pagination,
    columnPinning,
    columnOrder,
    columnSizing,
  ])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
      columnPinning,
      columnOrder,
      columnSizing,
      pagination,
    },
    defaultColumn: defaultColumnSizing,
    columnResizeMode: defaultColumnResizeMode,
    enableRowSelection,
    enableColumnResizing: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
  onPaginationChange: setPagination,
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

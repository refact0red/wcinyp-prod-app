import type { ColumnResizeMode, TableState } from "@tanstack/react-table"

export const defaultPageSize = 10
export const pageSizeOptions = [10, 20, 30, 50]

export const defaultColumnSizing = {
  size: 160,
  minSize: 80,
  maxSize: 420,
}

export const defaultTableState: Pick<TableState, "pagination"> = {
  pagination: {
    pageIndex: 0,
    pageSize: defaultPageSize,
  },
}

export const defaultColumnResizeMode: ColumnResizeMode = "onChange"

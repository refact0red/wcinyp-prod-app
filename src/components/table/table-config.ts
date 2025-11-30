import type { ColumnResizeMode, TableState } from "@tanstack/react-table"

export const defaultPageSize = 10000
export const pageSizeOptions = [defaultPageSize]

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

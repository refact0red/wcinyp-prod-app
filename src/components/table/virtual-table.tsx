import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/shadcn/ui/table"
import { cn } from "@/lib/utils"

type VirtualTableProps<TData> = {
  table: Table<TData>
  renderHeader?: () => React.ReactNode
  renderRow: (row: Row<TData>) => React.ReactNode
  estimateSize?: number
  overscan?: number
  className?: string
  rowClassName?: string
  emptyState?: React.ReactNode
  scrollHeight?: string
}

export function VirtualTable<TData>({
  table,
  renderHeader,
  renderRow,
  estimateSize = 64,
  overscan = 8,
  className,
  rowClassName,
  emptyState,
  scrollHeight = "640px",
}: VirtualTableProps<TData>) {
  const rows = table.getRowModel().rows
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  return (
    <div
      ref={parentRef}
      className={cn("relative overflow-auto", className)}
      style={{ maxHeight: scrollHeight }}
    >
      <ShadTable className="relative">
        {renderHeader?.()}
        <TableBody style={{ position: "relative" }}>
          <tr style={{ height: rowVirtualizer.getTotalSize() }} />
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length}>
                {emptyState ?? "No results"}
              </TableCell>
            </TableRow>
          )}
          {virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn("group hover:bg-muted/30", rowClassName)}
                style={{
                  position: "absolute",
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {renderRow(row)}
              </TableRow>
            )
          })}
        </TableBody>
      </ShadTable>
    </div>
  )
}

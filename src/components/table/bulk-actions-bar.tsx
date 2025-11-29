import * as React from "react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/utils"

type BulkActionsBarProps<TData> = {
  table: Table<TData>
  actions?: React.ReactNode
  className?: string
}

export function BulkActionsBar<TData>({
  table,
  actions,
  className,
}: BulkActionsBarProps<TData>) {
  const selected = table.getFilteredSelectedRowModel().rows
  if (!selected.length) return null

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3 text-sm lg:px-6",
        className
      )}
    >
      <span className="text-muted-foreground">
        {selected.length} selected
      </span>
      <div className="flex items-center gap-2">
        {actions}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.resetRowSelection()}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}

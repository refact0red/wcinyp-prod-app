import * as React from "react"

import { cn } from "@/lib/utils"
import { TableShell } from "@/components/table/table-shell"

type StaticTableProps = {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function StaticTable({
  title,
  description,
  children,
  className,
}: StaticTableProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
    >
      <div className="border-b bg-muted/40 px-4 py-3 md:px-5 md:py-3.5">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground whitespace-pre-line">
            {description}
          </p>
        ) : null}
      </div>
      <TableShell withBorder={false} className="rounded-none border-none">
        {children}
      </TableShell>
    </div>
  )
}

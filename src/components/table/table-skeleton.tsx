import * as React from "react"

import { Table, TableBody, TableCell, TableRow } from "@/components/shadcn/ui/table"
import { cn } from "@/lib/utils"

type TableSkeletonProps = {
  columns: number
  rows?: number
  className?: string
}

export function TableSkeleton({
  columns,
  rows = 6,
  className,
}: TableSkeletonProps) {
  return (
    <Table className={cn("w-full", className)}>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="animate-pulse">
            {Array.from({ length: columns }).map((__, cellIndex) => (
              <TableCell key={cellIndex}>
                <span className="bg-muted block h-4 w-full rounded" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

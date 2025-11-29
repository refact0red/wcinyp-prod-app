import * as React from "react"
import { Table } from "@tanstack/react-table"
import { FilterXIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select"
import { cn } from "@/lib/utils"

import { ColumnVisibilityMenu } from "./column-visibility-menu"

type ToolbarFilterOption = {
  label: string
  value: string
}

export type ToolbarFilter<TData> = {
  columnId: string
  label: string
  options: ToolbarFilterOption[]
  placeholder?: string
}

type TableToolbarProps<TData> = {
  table: Table<TData>
  filters?: ToolbarFilter<TData>[]
  searchPlaceholder?: string
  onReset?: () => void
  className?: string
  children?: React.ReactNode
  rightSlot?: React.ReactNode
}

export function TableToolbar<TData>({
  table,
  filters = [],
  searchPlaceholder = "Search",
  onReset,
  className,
  children,
  rightSlot,
}: TableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter ||
    table.getState().sorting.length > 0

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b bg-background/60 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6",
        className
      )}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-3">
        <div className="relative w-full lg:w-64">
          <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9"
          />
        </div>
        {filters.map((filter) => {
          const column = table.getColumn(filter.columnId)
          if (!column) return null

          const value = (column.getFilterValue() as string) ?? ""

          return (
            <Select
              key={filter.columnId}
              value={value}
              onValueChange={(val) => column.setFilterValue(val === "all" ? "" : val)}
            >
              <SelectTrigger className="w-full lg:w-44">
                <SelectValue placeholder={filter.placeholder ?? filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        })}
        {children}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => {
              table.resetColumnFilters()
              table.resetSorting()
              table.setGlobalFilter("")
              onReset?.()
            }}
          >
            <FilterXIcon className="size-4" />
            Reset
          </Button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ColumnVisibilityMenu table={table} />
        {rightSlot}
      </div>
    </div>
  )
}

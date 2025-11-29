"use client"

import * as React from "react"
import { FilterXIcon, SearchIcon } from "lucide-react"

import { ColumnVisibilityMenu } from "@/components/table/column-visibility-menu"
import { Button } from "@/components/shadcn/ui/button"
import { Input } from "@/components/shadcn/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select"

import { useDirectoryPeopleContext } from "./directory-table"

export function DirectoryPeopleToolbar() {
  const { table, teamOptions, resetState, openCreatePerson } =
    useDirectoryPeopleContext()

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter ||
    table.getState().sorting.length > 0

  const teamColumn = table.getColumn("team")
  const teamValue = (teamColumn?.getFilterValue() as string) ?? ""

  return (
    <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-full max-w-xs">
            <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              placeholder="Search by name, email, or team"
              className="h-8 w-full pl-9 text-sm"
            />
          </div>

          {teamColumn && teamOptions.length > 0 ? (
            <Select
              value={teamValue || "all"}
              onValueChange={(val) =>
                teamColumn.setFilterValue(val === "all" ? "" : val)
              }
            >
              <SelectTrigger size="sm" className="w-44 bg-background">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All teams</SelectItem>
                {teamOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 px-2 text-xs"
              onClick={() => {
                table.resetColumnFilters()
                table.resetSorting()
                table.setGlobalFilter("")
                resetState()
              }}
            >
              <FilterXIcon className="size-3.5" />
              Reset
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ColumnVisibilityMenu table={table} />
          <Button
            size="sm"
            className="h-8 gap-2 px-3 text-sm"
            onClick={openCreatePerson}
          >
            Add person
          </Button>
        </div>
      </div>
    </div>
  )
}

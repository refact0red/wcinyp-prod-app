"use client"

import * as React from "react"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import { Link2Icon, MoreVerticalIcon } from "lucide-react"

import type { DirectoryPerson } from "@/app/directory/data"
import { directoryPeople } from "@/app/directory/data"
import { BulkActionsBar } from "@/components/table/bulk-actions-bar"
import { EmptyState } from "@/components/table/empty-state"
import { TablePagination } from "@/components/table/table-pagination"
import { TableShell } from "@/components/table/table-shell"
import { TableToolbar, type ToolbarFilter } from "@/components/table/table-toolbar"
import { useDataTable } from "@/components/table/use-data-table"
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar"
import { Badge } from "@/components/shadcn/ui/badge"
import { Button } from "@/components/shadcn/ui/button"
import { Checkbox } from "@/components/shadcn/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table"

const teams: ToolbarFilter<DirectoryPerson>["options"] = Array.from(
  new Set(directoryPeople.map((person) => person.team))
)
  .sort((a, b) => a.localeCompare(b))
  .map((value) => ({ value, label: value }))

const columns: ColumnDef<DirectoryPerson>[] = [
  {
    id: "select",
    size: 50,
    enableSorting: false,
    enableResizing: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "team",
    header: "Team",
    size: 180,
    cell: ({ row }) => (
      <Badge variant="outline" className="w-fit capitalize">
        {row.original.team}
      </Badge>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
    cell: ({ row }) => {
      const person = row.original
      const initials = person.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback>{initials || "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-medium leading-tight">{person.name}</span>
            <span className="text-muted-foreground text-sm leading-tight">
              {person.title}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 120,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.location ?? (
          <span className="text-muted-foreground">—</span>
        )}
      </span>
    ),
  },
  {
    accessorKey: "officePhone",
    header: "Office",
    size: 140,
    cell: ({ row }) => renderPhone(row.original.officePhone),
  },
  {
    accessorKey: "mobilePhone",
    header: "Cell",
    size: 140,
    cell: ({ row }) => renderPhone(row.original.mobilePhone),
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 220,
    cell: ({ row }) =>
      row.original.email ? (
        <a className="text-sm font-medium hover:underline" href={`mailto:${row.original.email}`}>
          {row.original.email}
        </a>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    id: "actions",
    enableSorting: false,
    size: 70,
    cell: () => (
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="icon-sm" className="size-8">
          <Link2Icon className="size-4" />
          <span className="sr-only">Copy link</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="size-8">
              <MoreVerticalIcon className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem>Open profile</DropdownMenuItem>
            <DropdownMenuItem>Send message</DropdownMenuItem>
            <DropdownMenuItem>Copy email</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

const toolbarFilters: ToolbarFilter<DirectoryPerson>[] = [
  {
    columnId: "team",
    label: "Team",
    options: teams,
  },
]

const renderPhone = (value?: string) => {
  if (!value) return <span className="text-muted-foreground">—</span>
  const href = `tel:${value.replace(/[^\d+]/g, "")}`
  return (
    <a className="font-medium hover:underline" href={href}>
      {value}
    </a>
  )
}

export function DirectoryTable() {
  const { table, resetState } = useDataTable<DirectoryPerson>({
    data: directoryPeople,
    columns,
    stateKey: "directory-table",
    getRowId: (row) => row.id.toString(),
    initialState: {
      columnVisibility: {
        location: false,
      },
    },
  })

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <TableToolbar
        table={table}
        filters={toolbarFilters}
        searchPlaceholder="Search by name, email, or team"
        onReset={resetState}
      />
      <BulkActionsBar
        table={table}
        actions={
          <Button variant="secondary" size="sm">
            Message
          </Button>
        }
      />
      <TableShell withBorder={false}>
        <Table className="[&_td]:py-3 [&_th]:py-3">
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-muted/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {!table.getRowModel().rows.length && (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length}>
                  <EmptyState title="No people" description="Try adjusting your search or filters." />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableShell>
      <TablePagination table={table} />
    </div>
  )
}

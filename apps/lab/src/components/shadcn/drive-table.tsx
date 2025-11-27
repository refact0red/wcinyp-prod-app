"use client"

import * as React from "react"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import {
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  KanbanIcon,
  Link2Icon,
  MoreVerticalIcon,
  PrinterIcon,
  ShareIcon,
} from "lucide-react"

import type { DriveItem, DriveItemType } from "@/app/drive/data"
import { driveItems } from "@/app/drive/data"
import { BulkActionsBar } from "@/components/table/bulk-actions-bar"
import { EmptyState } from "@/components/table/empty-state"
import { TablePagination } from "@/components/table/table-pagination"
import { TableShell } from "@/components/table/table-shell"
import { TableToolbar } from "@/components/table/table-toolbar"
import { VirtualTable } from "@/components/table/virtual-table"
import { useDataTable } from "@/components/table/use-data-table"
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/ui/tooltip"

const typeIcon: Record<DriveItemType, typeof FileTextIcon> = {
  Document: FileTextIcon,
  Presentation: KanbanIcon,
  Spreadsheet: FileSpreadsheetIcon,
  Image: ImageIcon,
  Folder: FolderIcon,
}

function getPinnedStyle(column: { getIsPinned: () => false | "left" | "right" }) {
  const pinned = column.getIsPinned()
  if (pinned === "left") return { position: "sticky" as const, left: 0, zIndex: 5 }
  if (pinned === "right") return { position: "sticky" as const, right: 0, zIndex: 5 }
  return {}
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date))
}

const columns: ColumnDef<DriveItem>[] = [
  {
    id: "select",
    size: 50,
    enableSorting: false,
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
    accessorKey: "name",
    header: "Name",
    size: 320,
    cell: ({ row }) => {
      const item = row.original
      const TypeIcon = typeIcon[item.type]
      return (
        <div className="flex items-center gap-3">
          <span className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-lg">
            <TypeIcon className="size-4" />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-medium">{item.name}</span>
            {item.shared && (
              <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1">
                  <ShareIcon className="size-3.5" />
                  Shared
                </span>
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  {
    id: "quick-actions",
    header: "Quick Actions",
    size: 240,
    enablePinning: true,
    cell: () => (
      <div className="inline-flex overflow-hidden rounded-md border bg-background shadow-xs">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="border-border focus-visible:z-10 inline-flex h-auto rounded-none border-l px-3 py-2 first:border-l-0"
            >
              <PrinterIcon className="size-4" />
              <span className="text-xs font-medium">Print</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Print</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="border-border focus-visible:z-10 inline-flex h-auto rounded-none border-l px-3 py-2 first:border-l-0"
            >
              <DownloadIcon className="size-4" />
              <span className="text-xs font-medium">Download</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Download</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="border-border focus-visible:z-10 inline-flex h-auto rounded-none border-l px-3 py-2 first:border-l-0"
            >
              <Link2Icon className="size-4" />
              <span className="text-xs font-medium">Copy Link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Copy link</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    size: 150,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.updated)}
      </span>
    ),
  },
  {
    accessorKey: "size",
    header: () => <div className="text-right">Size</div>,
    size: 110,
    cell: ({ row }) => (
      <div className="text-right text-sm font-medium">{row.original.size}</div>
    ),
  },
  {
    id: "actions",
    enablePinning: true,
    size: 70,
    cell: () => (
      <div className="flex justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="size-8">
              <MoreVerticalIcon className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Move</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

export function DriveTable() {
  const [virtualized, setVirtualized] = React.useState(false)
  const { table, resetState } = useDataTable<DriveItem>({
    data: driveItems,
    columns,
    stateKey: "drive-table",
    getRowId: (row) => row.id.toString(),
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  })

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <TableToolbar
        table={table}
        searchPlaceholder="Search files"
        onReset={resetState}
        rightSlot={
          <Button variant="ghost" size="sm" onClick={() => setVirtualized((v) => !v)}>
            {virtualized ? "Disable virtualization" : "Enable virtualization"}
          </Button>
        }
      />
      <BulkActionsBar
        table={table}
        actions={
          <>
            <Button variant="secondary" size="sm">
              Download
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </>
        }
      />
      <TableShell withBorder={false}>
        {virtualized ? (
          <VirtualTable
            table={table}
            scrollHeight="520px"
            renderHeader={() => (
              <TableHeader className="bg-muted/40">
                {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize(), ...getPinnedStyle(header.column) }}
                    className={header.column.getIsPinned() ? "bg-muted" : undefined}
                  >
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
            )}
            emptyState={
              <EmptyState title="No files" description="Try adjusting your filters." />
            }
            renderRow={(row) =>
              row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize(), ...getPinnedStyle(cell.column) }}
                  className={cell.column.getIsPinned() ? "bg-card" : undefined}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))
            }
          />
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize(), ...getPinnedStyle(header.column) }}
                    className={header.column.getIsPinned() ? "bg-muted" : undefined}
                  >
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
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        ...getPinnedStyle(cell.column),
                      }}
                      className={cell.column.getIsPinned() ? "bg-card" : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {!table.getRowModel().rows.length && (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <EmptyState title="No files" description="Try adjusting your filters." />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableShell>
      <TablePagination table={table} />
    </div>
  )
}

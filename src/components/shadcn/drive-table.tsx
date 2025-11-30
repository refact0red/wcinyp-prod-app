"use client"

import * as React from "react"
import { ColumnDef, Table as ReactTable, flexRender } from "@tanstack/react-table"
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
import { EmptyState } from "@/components/table/empty-state"
import { TableShell } from "@/components/table/table-shell"
import { VirtualTable } from "@/components/table/virtual-table"
import { useDataTable } from "@/components/table/use-data-table"
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
import { Button } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/utils"

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

const driveRowClasses =
  "group bg-[#0b0b0b] text-white hover:bg-[#1b1b1b] data-[state=selected]:bg-[#141414] transition-colors"
const drivePinnedCellClasses = "bg-[#0b0b0b] group-hover:bg-[#1b1b1b]"

const columns: ColumnDef<DriveItem>[] = [
  {
    id: "select",
    size: 50,
    enableSorting: false,
    header: ({ table }) => (
      <div className="flex justify-start pl-7">
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-start pl-7">
        <Checkbox
          aria-label={`Select ${row.original.name}`}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
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
          </div>
        </div>
      )
    },
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
    enablePinning: false,
    size: 240,
    header: "Actions",
    cell: () => (
      <div className="flex justify-end gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10">
              <PrinterIcon className="size-4" />
              <span className="sr-only">Print</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Print</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10">
              <DownloadIcon className="size-4" />
              <span className="sr-only">Download</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Download</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/10"
              disabled
            >
              <Link2Icon className="size-4" />
              <span className="sr-only">Copy link (disabled)</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>OneDrive link (disabled)</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/10">
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

type DriveTableContextValue = {
  table: ReactTable<DriveItem>
  resetState: () => void
}

const DriveTableContext =
  React.createContext<DriveTableContextValue | undefined>(undefined)

export function useDriveTableContext() {
  const context = React.useContext(DriveTableContext)
  if (!context) {
    throw new Error(
      "useDriveTableContext must be used within a DriveTableProvider"
    )
  }
  return context
}

export function DriveTableProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { table, resetState } = useDataTable<DriveItem>({
    data: driveItems,
    columns,
    stateKey: "drive-table-v3",
    getRowId: (row) => row.id.toString(),
    initialState: {
      columnVisibility: {
        size: false,
      },
    },
  })

  const value = React.useMemo(
    () => ({ table, resetState }),
    [table, resetState]
  )

  return (
    <DriveTableContext.Provider value={value}>
      {children}
    </DriveTableContext.Provider>
  )
}

export function DriveTable() {
  const { table } = useDriveTableContext()
  const [virtualized] = React.useState(false)

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-card">
      <TableShell
        withBorder={false}
        scrollable={false}
        className="h-full flex-1 rounded-none"
      >
        {virtualized ? (
          <VirtualTable
            table={table}
            scrollHeight="calc(100vh - 220px)"
            renderHeader={() => (
              <TableHeader className="sticky top-0 z-20 bg-card">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize(), ...getPinnedStyle(header.column) }}
                        className={cn(
                          "sticky top-0 z-20 h-[var(--drive-header-h)] bg-card px-3",
                          header.column.getIsPinned() ? "bg-muted/10" : undefined
                        )}
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
                  className={cell.column.getIsPinned() ? drivePinnedCellClasses : undefined}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))
            }
            rowClassName={driveRowClasses}
          />
        ) : (
          <div className="flex h-full flex-1 flex-col">
            <div className="sticky top-0 z-20 bg-card shadow-sm">
              <Table containerClassName="overflow-visible" className="border-separate border-spacing-0">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{ width: header.getSize(), ...getPinnedStyle(header.column) }}
                          className={cn(
                            "h-[var(--drive-header-h)] bg-card px-3",
                            header.column.getIsPinned() ? "bg-muted/10" : undefined
                          )}
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
              </Table>
            </div>
            <div className="flex-1 overflow-auto">
              <Table
                containerClassName="overflow-visible"
                className="border-separate border-spacing-0"
              >
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={driveRowClasses}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: cell.column.getSize(),
                            ...getPinnedStyle(cell.column),
                          }}
                          className={cell.column.getIsPinned() ? drivePinnedCellClasses : undefined}
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
            </div>
          </div>
        )}
      </TableShell>
    </div>
  )
}

import type { Meta, StoryObj } from "@storybook/react"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import { CheckCircle2Icon, ClockIcon } from "lucide-react"

import { BulkActionsBar } from "@/components/table/bulk-actions-bar"
import { EmptyState } from "@/components/table/empty-state"
import { TablePagination } from "@/components/table/table-pagination"
import { TableShell } from "@/components/table/table-shell"
import { TableToolbar } from "@/components/table/table-toolbar"
import { useDataTable } from "@/components/table/use-data-table"
import { Badge } from "@/components/shadcn/ui/badge"
import { Button } from "@/components/shadcn/ui/button"
import { Checkbox } from "@/components/shadcn/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table"

type Person = {
  id: number
  name: string
  role: string
  status: "Active" | "Pending"
}

const data: Person[] = [
  { id: 1, name: "Jamie Rivera", role: "Research Lead", status: "Active" },
  { id: 2, name: "Taylor Kim", role: "Writer", status: "Pending" },
  { id: 3, name: "Morgan Lee", role: "Designer", status: "Active" },
  { id: 4, name: "Kai Patel", role: "Capture", status: "Pending" },
]

const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="gap-1 capitalize [&_svg]:size-3.5"
      >
        {row.original.status === "Active" ? (
          <CheckCircle2Icon className="text-green-500" />
        ) : (
          <ClockIcon className="text-amber-500" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
]

const TablePlayground = () => {
  const { table, resetState } = useDataTable<Person>({
    data,
    columns,
    stateKey: "storybook-table-kit",
    getRowId: (row) => row.id.toString(),
  })

  return (
    <div className="max-w-4xl rounded-lg border bg-card">
      <TableToolbar
        table={table}
        searchPlaceholder="Search people"
        onReset={resetState}
      />
      <BulkActionsBar
        table={table}
        actions={
          <Button size="sm" variant="secondary">
            Notify
          </Button>
        }
      />
      <TableShell withBorder={false}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
              <TableRow key={row.id}>
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
                  <EmptyState />
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

const meta = {
  title: "Table/Kit",
  component: TablePlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TablePlayground>

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => <TablePlayground />,
}

export default meta

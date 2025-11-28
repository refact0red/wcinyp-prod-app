"use client"

import * as React from "react"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import { CheckIcon, ClipboardIcon, MoreVerticalIcon, PlusIcon } from "lucide-react"

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
import { Label } from "@/components/shadcn/ui/label"
import {
  InputGroup,
  InputGroupInput,
} from "@/components/shadcn/ui/input-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/ui/tooltip"

type PersonFormState = {
  name: string
  title: string
  team: string
  officePhone: string
  mobilePhone: string
  email: string
}

const emptyFormState: PersonFormState = {
  name: "",
  title: "",
  team: "",
  officePhone: "",
  mobilePhone: "",
  email: "",
}

function formatContactDetails(person: DirectoryPerson) {
  const formatValue = (value?: string) => {
    const trimmed = value?.trim()
    return trimmed && trimmed.length > 0 ? trimmed : "n/a"
  }

  const lines = [
    `${person.name}${person.title ? `, ${person.title}` : ""}`,
    `Office: ${formatValue(person.officePhone)}`,
    `Cell: ${formatValue(person.mobilePhone)}`,
    `Email: ${formatValue(person.email)}`,
  ]

  return lines.join("\n")
}

function DirectoryActions({
  person,
  onEdit,
  onDelete,
}: {
  person: DirectoryPerson
  onEdit: (person: DirectoryPerson) => void
  onDelete: (person: DirectoryPerson) => void
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    const contactDetails = formatContactDetails(person)

    try {
      await navigator.clipboard.writeText(contactDetails)
      setCopied(true)
    } catch (error) {
      console.error("Failed to copy contact details", error)
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-8"
            onClick={handleCopy}
            aria-pressed={copied}
          >
            {copied ? <CheckIcon className="size-4" /> : <ClipboardIcon className="size-4" />}
            <span className="sr-only">{copied ? "Copied contact" : "Copy contact"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={6}>Copy contact</TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="size-8">
                <MoreVerticalIcon className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Edit</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onSelect={() => onEdit(person)}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => onDelete(person)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

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
  const [people, setPeople] = React.useState<DirectoryPerson[]>(directoryPeople)
  const [formState, setFormState] = React.useState<PersonFormState>(emptyFormState)
  const [editingPersonId, setEditingPersonId] = React.useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  const editingPerson = React.useMemo(
    () => people.find((person) => person.id === editingPersonId) ?? null,
    [editingPersonId, people]
  )

  const resetFormState = React.useCallback(() => {
    setFormState(emptyFormState)
    setEditingPersonId(null)
  }, [])

  React.useEffect(() => {
    if (!editingPerson) return
    setFormState({
      name: editingPerson.name ?? "",
      title: editingPerson.title ?? "",
      team: editingPerson.team ?? "",
      officePhone: editingPerson.officePhone ?? "",
      mobilePhone: editingPerson.mobilePhone ?? "",
      email: editingPerson.email ?? "",
    })
  }, [editingPerson])

  const normalize = (value?: string) => value?.trim() ?? ""

  const isDirty = React.useMemo(() => {
    if (!editingPerson) {
      return (
        normalize(formState.name) !== "" ||
        normalize(formState.title) !== "" ||
        normalize(formState.team) !== "" ||
        normalize(formState.officePhone) !== "" ||
        normalize(formState.mobilePhone) !== "" ||
        normalize(formState.email) !== ""
      )
    }

    return (
      normalize(formState.name) !== normalize(editingPerson.name) ||
      normalize(formState.title) !== normalize(editingPerson.title) ||
      normalize(formState.team) !== normalize(editingPerson.team) ||
      normalize(formState.officePhone) !== normalize(editingPerson.officePhone) ||
      normalize(formState.mobilePhone) !== normalize(editingPerson.mobilePhone) ||
      normalize(formState.email) !== normalize(editingPerson.email)
    )
  }, [editingPerson, formState])

  const teamOptions = React.useMemo<ToolbarFilter<DirectoryPerson>["options"]>(() => {
    return Array.from(new Set(people.map((person) => person.team)))
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, label: value }))
  }, [people])

  const toolbarFilters = React.useMemo<ToolbarFilter<DirectoryPerson>[]>(
    () => [
      {
        columnId: "team",
        label: "Team",
        options: teamOptions,
      },
    ],
    [teamOptions]
  )

  const handleEdit = React.useCallback((person: DirectoryPerson) => {
    setEditingPersonId(person.id)
    setIsSheetOpen(true)
  }, [])

  const handleDelete = React.useCallback(
    (person: DirectoryPerson) => {
      const confirmed =
        typeof window === "undefined" ? true : window.confirm(`Delete ${person.name}?`)
      if (!confirmed) return

      setPeople((prev) => prev.filter((entry) => entry.id !== person.id))
      if (editingPersonId === person.id) {
        setIsSheetOpen(false)
        resetFormState()
      }
    },
    [editingPersonId, resetFormState]
  )

  const handleCreate = React.useCallback(() => {
    resetFormState()
    setIsSheetOpen(true)
  }, [resetFormState])

  const attemptCloseSheet = React.useCallback(() => {
    if (isDirty) {
      const confirmed =
        typeof window === "undefined"
          ? true
          : window.confirm("Discard changes to this contact?")
      if (!confirmed) return
    }
    setIsSheetOpen(false)
    resetFormState()
  }, [isDirty, resetFormState])

  const handleSheetOpenChange = (open: boolean) => {
    if (open) {
      setIsSheetOpen(true)
      return
    }
    attemptCloseSheet()
  }

  const updateField =
    (field: keyof PersonFormState) => (value: string) =>
      setFormState((prev) => ({ ...prev, [field]: value }))

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = formState.name.trim()
    const team = formState.team.trim() || (editingPerson?.team ?? "")
    if (!name || !team) return

    if (editingPerson) {
      const updatedPerson: DirectoryPerson = {
        ...editingPerson,
        name,
        title: formState.title.trim(),
        team,
        officePhone: formState.officePhone.trim() || undefined,
        mobilePhone: formState.mobilePhone.trim() || undefined,
        email: formState.email.trim(),
      }

      setPeople((prev) =>
        prev.map((person) => (person.id === editingPerson.id ? updatedPerson : person))
      )
    } else {
      const nextId =
        people.length > 0 ? Math.max(...people.map((person) => person.id)) + 1 : 1

      const newPerson: DirectoryPerson = {
        id: nextId,
        name,
        title: formState.title.trim(),
        team,
        officePhone: formState.officePhone.trim() || undefined,
        mobilePhone: formState.mobilePhone.trim() || undefined,
        email: formState.email.trim(),
        status: "Active",
      }

      setPeople((prev) => [...prev, newPerson])
    }

    setIsSheetOpen(false)
    resetFormState()
  }

  const columns = React.useMemo<ColumnDef<DirectoryPerson>[]>(
    () => [
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
            <a
              className="text-sm font-medium hover:underline"
              href={`mailto:${row.original.email}`}
            >
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
        cell: ({ row }) => (
          <DirectoryActions
            person={row.original}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
      },
    ],
    [handleEdit, handleDelete]
  )

  const { table, resetState } = useDataTable<DirectoryPerson>({
    data: people,
    columns,
    stateKey: "directory-table",
    getRowId: (row) => row.id.toString(),
    initialState: {
      columnVisibility: {
        location: false,
      },
    },
  })

  React.useEffect(() => {
    table.resetRowSelection()
  }, [people, table])

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <TableToolbar
          table={table}
          filters={toolbarFilters}
          searchPlaceholder="Search by name, email, or team"
          onReset={resetState}
          rightSlot={
            <Button size="sm" className="gap-2" onClick={handleCreate}>
              <PlusIcon className="size-4" />
              Add person
            </Button>
          }
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
                    <EmptyState
                      title="No people"
                      description="Try adjusting your search or filters."
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableShell>
        <TablePagination table={table} />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent side="right" className="flex flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingPerson ? "Edit contact" : "Add person"}</SheetTitle>
            <SheetDescription>
              {editingPerson
                ? "Update this person\u2019s details."
                : "Create a new person in the directory."}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 pr-5">
            <form id="person-form" className="mt-6 space-y-4 pb-4" onSubmit={handleSave}>
              <div className="space-y-1.5">
                <Label htmlFor="person-name">Name</Label>
                <InputGroup className="px-2 py-1">
                  <InputGroupInput
                    id="person-name"
                    value={formState.name}
                    onChange={(event) => updateField("name")(event.target.value)}
                    placeholder="Full name"
                    required
                  />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="person-title">Title</Label>
                <InputGroup className="px-2 py-1">
                  <InputGroupInput
                    id="person-title"
                    value={formState.title}
                    onChange={(event) => updateField("title")(event.target.value)}
                    placeholder="Role or title"
                  />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="person-team">Team</Label>
                <InputGroup className="px-2 py-1">
                  <InputGroupInput
                    id="person-team"
                    value={formState.team}
                    onChange={(event) => updateField("team")(event.target.value)}
                    placeholder="Team"
                    required
                  />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="person-office">Office</Label>
                <InputGroup className="px-2 py-1">
                  <InputGroupInput
                    id="person-office"
                    value={formState.officePhone}
                    onChange={(event) => updateField("officePhone")(event.target.value)}
                    placeholder="(555) 555-5555"
                  />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="person-cell">Cell</Label>
                <InputGroup className="px-2 py-1">
                  <InputGroupInput
                    id="person-cell"
                    value={formState.mobilePhone}
                    onChange={(event) => updateField("mobilePhone")(event.target.value)}
                    placeholder="(555) 555-5555"
                  />
                </InputGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="person-email">Email</Label>
                <InputGroup className="px-2 py-1">
                  <InputGroupInput
                    id="person-email"
                    type="email"
                    value={formState.email}
                    onChange={(event) => updateField("email")(event.target.value)}
                    placeholder="name@company.com"
                  />
                </InputGroup>
              </div>
            </form>
          </div>

          <div className="border-t bg-card/80 px-4 pb-4 pt-3 backdrop-blur">
            <div className="flex flex-col gap-2">
              <Button type="submit" form="person-form" disabled={!editingPerson}>
                Save changes
              </Button>
              <Button type="button" variant="outline" onClick={attemptCloseSheet}>
                Close
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

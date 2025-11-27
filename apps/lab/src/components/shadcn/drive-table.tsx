"use client";

import * as React from "react";
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
    SearchIcon,
    ShareIcon,
} from "lucide-react";

import type { DriveItemStatus, DriveItemType } from "@/app/drive/data";
import { driveItems } from "@/app/drive/data";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/ui/dropdown-menu";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/ui/tooltip";

const typeIcon: Record<DriveItemType, typeof FileTextIcon> = {
    Document: FileTextIcon,
    Presentation: KanbanIcon,
    Spreadsheet: FileSpreadsheetIcon,
    Image: ImageIcon,
    Folder: FolderIcon,
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));
}

export function DriveTable() {
    const [query, setQuery] = React.useState("");
    const [status, setStatus] = React.useState<DriveItemStatus | "all">("all");
    const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

    const filtered = React.useMemo(() => {
        return driveItems.filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            const matchesStatus = status === "all" ? true : item.status === status;
            return matchesQuery && matchesStatus;
        });
    }, [query, status]);

    const toggleSelection = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const toggleAll = (checked: boolean) => {
        setSelectedIds(() => (checked ? new Set(filtered.map((item) => item.id)) : new Set()));
    };

    const allSelected = filtered.length > 0 && filtered.every((item) => selectedIds.has(item.id));
    const someSelected = filtered.some((item) => selectedIds.has(item.id));

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Label htmlFor="drive-search" className="sr-only">
                    Search
                </Label>
                <div className="relative w-full md:max-w-sm">
                    <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        id="drive-search"
                        placeholder="Search files"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex w-full flex-col gap-2 md:w-fit md:flex-row md:items-center md:gap-3">
                    <Label htmlFor="drive-status" className="text-sm font-medium text-muted-foreground md:sr-only">
                        Status
                    </Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as DriveItemStatus | "all")}>
                        <SelectTrigger id="drive-status" className="w-full md:w-44">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="Synced">Synced</SelectItem>
                            <SelectItem value="In Review">In review</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="w-[40px]">
                                <Checkbox
                                    aria-label="Select all"
                                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                                    onCheckedChange={(value) => toggleAll(value === true)}
                                />
                            </TableHead>
                            <TableHead className="w-[45%]">Name</TableHead>
                            <TableHead className="w-[220px]">Quick Actions</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="text-right">Size</TableHead>
                            <TableHead className="w-[80px] text-right">
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((item) => {
                            const TypeIcon = typeIcon[item.type];
                            const isSelected = selectedIds.has(item.id);
                            return (
                                <TableRow
                                    key={item.id}
                                    data-state={isSelected ? "selected" : undefined}
                                    className="hover:bg-muted/30"
                                >
                                    <TableCell className="w-[40px]">
                                        <Checkbox
                                            aria-label={`Select ${item.name}`}
                                            checked={isSelected}
                                            onCheckedChange={() => toggleSelection(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-lg">
                                                <TypeIcon className="size-4" />
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium">{item.name}</span>
                                                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                                                    <Badge variant="outline" className="bg-background px-2 py-0 text-xs capitalize">
                                                        {item.type.toLowerCase()}
                                                    </Badge>
                                                    {item.shared && (
                                                        <span className="flex items-center gap-1">
                                                            <ShareIcon className="size-3.5" />
                                                            Shared
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{formatDate(item.updated)}</TableCell>
                                    <TableCell className="text-right text-sm font-medium">{item.size}</TableCell>
                                    <TableCell className="text-right">
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
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {!filtered.length && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-20 text-center text-muted-foreground">
                                    No files match your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

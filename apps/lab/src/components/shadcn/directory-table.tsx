"use client";

import * as React from "react";
import { Link2Icon, MoreVerticalIcon, SearchIcon } from "lucide-react";

import type { DirectoryPerson } from "@/app/directory/data";
import { directoryPeople } from "@/app/directory/data";
import { Badge } from "@/components/shadcn/ui/badge";
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/shadcn/ui/dropdown-menu";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";

type DirectoryFilter = {
    team: "all" | DirectoryPerson["team"];
};

const cleanPhoneHref = (value?: string) => (value ? `tel:${value.replace(/[^\d+]/g, "")}` : undefined);

export function DirectoryTable() {
    const [query, setQuery] = React.useState("");
    const [filter, setFilter] = React.useState<DirectoryFilter>({ team: "all" });
    const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

    const getInitials = (name: string) =>
        name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("");

    const teams = React.useMemo(
        () => Array.from(new Set(directoryPeople.map((person) => person.team))).sort((a, b) => a.localeCompare(b)),
        [],
    );

    const filtered = React.useMemo(() => {
        return directoryPeople.filter((person) => {
            const matchesTeam = filter.team === "all" ? true : person.team === filter.team;
            const normalizedQuery = query.toLowerCase().trim();
            if (!normalizedQuery) return matchesTeam;

            const haystack = [person.name, person.title, person.email, person.team, person.location].filter(Boolean).join(" ").toLowerCase();
            return matchesTeam && haystack.includes(normalizedQuery);
        });
    }, [filter.team, query]);

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
        setSelectedIds(() => (checked ? new Set(filtered.map((person) => person.id)) : new Set()));
    };

    const allSelected = filtered.length > 0 && filtered.every((person) => selectedIds.has(person.id));
    const someSelected = filtered.some((person) => selectedIds.has(person.id));

    const renderPhone = (value?: string) => {
        if (!value) return <span className="text-muted-foreground">—</span>;

        const href = cleanPhoneHref(value);
        return (
            <a className="font-medium hover:underline" href={href}>
                {value}
            </a>
        );
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Label htmlFor="directory-search" className="sr-only">
                    Search
                </Label>
                <div className="relative w-full md:max-w-sm">
                    <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                    <Input
                        id="directory-search"
                        placeholder="Search by name, email, or team"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex w-full flex-col gap-2 md:w-fit md:flex-row md:items-center md:gap-3">
                    <Label htmlFor="directory-team" className="text-sm font-medium text-muted-foreground md:sr-only">
                        Team
                    </Label>
                    <Select
                        value={filter.team}
                        onValueChange={(value) => setFilter((prev) => ({ ...prev, team: value as DirectoryFilter["team"] }))}
                    >
                        <SelectTrigger id="directory-team" className="w-full md:w-44">
                            <SelectValue placeholder="Filter by team" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All teams</SelectItem>
                            {teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                    {team}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <Table className="[&_td]:py-3 [&_th]:py-3">
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="w-[40px] min-w-[40px]">
                                <Checkbox
                                    aria-label="Select all"
                                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                                    onCheckedChange={(value) => toggleAll(value === true)}
                                />
                            </TableHead>
                            <TableHead className="w-[30%] min-w-[200px]">Name</TableHead>
                            <TableHead className="w-[24%]">Team</TableHead>
                            <TableHead className="w-[11%]">Office</TableHead>
                            <TableHead className="w-[11%]">Cell</TableHead>
                            <TableHead className="w-[24%]">Email</TableHead>
                            <TableHead className="w-[80px] text-right">
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((person) => (
                            <TableRow
                                key={person.id}
                                data-state={selectedIds.has(person.id) ? "selected" : undefined}
                                className="hover:bg-muted/30"
                            >
                                <TableCell className="w-[40px] min-w-[40px]">
                                    <Checkbox
                                        aria-label={`Select ${person.name}`}
                                        checked={selectedIds.has(person.id)}
                                        onCheckedChange={() => toggleSelection(person.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-9">
                                            <AvatarFallback>{getInitials(person.name) || "?"}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium leading-tight">{person.name}</span>
                                            <span className="text-muted-foreground text-sm leading-tight">{person.title}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="w-fit capitalize">
                                        {person.team}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{renderPhone(person.officePhone)}</TableCell>
                                <TableCell className="text-sm">{renderPhone(person.mobilePhone)}</TableCell>
                                <TableCell className="text-sm font-medium">
                                    {person.email ? (
                                        <a className="hover:underline" href={`mailto:${person.email}`}>
                                            {person.email}
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
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
                                </TableCell>
                            </TableRow>
                        ))}
                        {!filtered.length && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                                    No people match your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

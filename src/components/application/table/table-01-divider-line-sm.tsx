"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import teamMembers from "@/components/application/table/team-members.json";
import { Avatar } from "@/components/base/avatar/avatar";
import type { BadgeTypes } from "@/components/base/badges/badge-types";
import { Badge, type BadgeColor } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

export type DirectoryTableItem = {
    username: string;
    name: string;
    avatarUrl: string;
    status: "active" | "inactive";
    role: string;
    email: string;
    teams: {
        name: string;
        color: BadgeColor<BadgeTypes>;
    }[];
};

type DirectoryTableProps = {
    title?: string;
    badgeLabel?: ReactNode;
    items?: DirectoryTableItem[];
    withCard?: boolean;
    className?: string;
};

export const Table01DividerLineSm = ({ title = "Team directory", badgeLabel, items, withCard = true, className }: DirectoryTableProps) => {
    const data = items ?? (teamMembers as { items: DirectoryTableItem[] }).items;
    const getInitials = (name: string) =>
        name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("");
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    const sortedItems = useMemo(() => {
        return [...data].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? Number(second) - Number(first) : Number(first) - Number(second);
            }

            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }

            return 0;
        });
    }, [data, sortDescriptor]);

    const badge = badgeLabel ?? `${data.length} people`;
    const ariaLabel = typeof badge === "string" ? `${title} (${badge})` : title;

    const tableContent = (
        <>
            <Table aria-label={ariaLabel} selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} size="sm">
                <Table.Header>
                    <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                    <Table.Head id="role" label="Role" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                    <Table.Head id="teams" label="Teams" />
                    <Table.Head id="actions" />
                </Table.Header>

                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.username}>
                            <Table.Cell>
                                <div className="flex items-center gap-2">
                                    <Avatar initials={getInitials(item.name)} alt={item.name} size="sm" />
                                    <p className="text-sm font-medium whitespace-nowrap text-primary">{item.name}</p>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.role}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-1">
                                    {item.teams.slice(0, 3).map((team) => (
                                        <Badge key={team.name} color={team.color as BadgeColor<BadgeTypes>} size="sm">
                                            {team.name}
                                        </Badge>
                                    ))}

                                    {item.teams.length > 3 && (
                                        <Badge color="gray" size="sm">
                                            +{item.teams.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="px-3">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <PaginationCardMinimal align="right" page={1} total={10} className="px-4 py-3 md:px-5 md:pt-3 md:pb-4" />
        </>
    );

    if (withCard) {
        return (
            <TableCard.Root size="sm" className={className}>
                {tableContent}
            </TableCard.Root>
        );
    }

    return <div className={className}>{tableContent}</div>;
};

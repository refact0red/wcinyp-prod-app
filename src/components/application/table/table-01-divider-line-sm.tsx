"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import teamMembers from "@/components/application/table/team-members.json" assert { type: "json" };
import { Avatar } from "@/components/base/avatar/avatar";
import type { BadgeTypes } from "@/components/base/badges/badge-types";
import { Badge, type BadgeColor } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

type ContactType = "email" | "phone" | "mobile" | "desk" | "teams" | "fax" | "other";

type ContactMethod = {
    type: ContactType;
    value: string;
    label?: string;
};

export type DirectoryTableItem = {
    username: string;
    name: string;
    title?: string;
    role?: string;
    avatarUrl?: string | null;
    initials?: string;
    status?: "active" | "inactive";
    contacts?: ContactMethod[];
    email?: string;
    tags?: {
        name: string;
        color: BadgeColor<BadgeTypes>;
    }[];
    teams?: {
        name: string;
        color: BadgeColor<BadgeTypes>;
    }[];
    entityType?: "person" | "location" | "resource";
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
    const formatLabel = (type: ContactType) => {
        switch (type) {
            case "email":
                return "Email";
            case "phone":
                return "Phone";
            case "mobile":
                return "Cell";
            case "desk":
                return "Desk";
            case "teams":
                return "Teams";
            case "fax":
                return "Fax";
            default:
                return "";
        }
    };

    const normalizeContacts = (item: DirectoryTableItem) => {
        const contacts = [...(item.contacts ?? [])];
        if (!contacts.length && item.email) {
            contacts.push({ type: "email", value: item.email });
        }
        return contacts;
    };

    const normalizeTags = (item: DirectoryTableItem) => item.tags ?? item.teams ?? [];
    const normalizeTitle = (item: DirectoryTableItem) => item.title ?? item.role;

    const tableContent = (
        <>
            <Table aria-label={ariaLabel} selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} size="sm">
                <Table.Header>
                    <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-[40%]" />
                    <Table.Head id="contacts" label="Contact details" className="w-full max-w-[30%]" />
                    <Table.Head id="tags" label="Tags" className="min-w-[160px]" />
                    <Table.Head id="actions" />
                </Table.Header>

                <Table.Body items={sortedItems}>
                    {(item) => {
                        const contacts = normalizeContacts(item);
                        const tags = normalizeTags(item);
                        const title = normalizeTitle(item);
                        const initials = item.initials ?? getInitials(item.name);

                        return (
                            <Table.Row id={item.username}>
                                <Table.Cell>
                                    <div className="flex items-start gap-3">
                                        <Avatar initials={initials} alt={item.name} size="sm" />
                                        <div className="flex min-w-0 flex-col">
                                            <p className="text-sm font-semibold text-primary">{item.name}</p>
                                            {title && <p className="text-xs text-tertiary">{title}</p>}
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="align-top">
                                    <div className="flex flex-col gap-1">
                                        {contacts.length === 0 ? (
                                            <span className="text-sm text-quaternary">No contact info</span>
                                        ) : (
                                            <>
                                                {contacts.slice(0, 2).map((contact, index) => {
                                                    const label = contact.label ?? formatLabel(contact.type);
                                                    const href =
                                                        contact.type === "email"
                                                            ? `mailto:${contact.value}`
                                                            : ["phone", "mobile", "desk", "fax"].includes(contact.type)
                                                              ? `tel:${contact.value.replace(/[()\s-]/g, "")}`
                                                              : undefined;
                                                    const displayValue =
                                                        contact.type === "email" || href?.startsWith("tel:")
                                                            ? (
                                                                  <a
                                                                      className="text-primary underline-offset-2 hover:underline"
                                                                      href={href}
                                                                  >
                                                                      {contact.value}
                                                                  </a>
                                                              )
                                                            : (
                                                                  <span className="text-primary">{contact.value}</span>
                                                              );

                                                    return (
                                                        <div key={`${contact.value}-${index}`} className="flex items-start gap-1 text-sm">
                                                            {label && <span className="text-quaternary">{label}:</span>}
                                                            {displayValue}
                                                        </div>
                                                    );
                                                })}

                                                {contacts.length > 2 && (
                                                    <span className="text-xs text-quaternary">+{contacts.length - 2} more</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    {tags.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {tags.slice(0, 3).map((tag) => (
                                                <Badge key={tag.name} color={tag.color as BadgeColor<BadgeTypes>} size="sm">
                                                    {tag.name}
                                                </Badge>
                                            ))}

                                            {tags.length > 3 && (
                                                <Badge color="gray" size="sm">
                                                    +{tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-quaternary">No tags</span>
                                    )}
                                </Table.Cell>
                                <Table.Cell className="px-3">
                                    <div className="flex justify-end gap-0.5">
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        );
                    }}
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

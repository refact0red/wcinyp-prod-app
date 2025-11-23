"use client";

import { useMemo } from "react";
import { Bell01, ChevronDown, Container, HelpCircle, LayersTwo01, LogOut01, Settings01, User01 } from "@untitledui/icons";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import type { NavItemType } from "./config";
import { NavItemButton } from "./base-components/nav-item-button";

type BreadcrumbItem = {
    /** Text to display for this breadcrumb. */
    label: string;
    /** Link for the breadcrumb, if navigable. */
    href?: string;
};

interface HeaderTopActionsProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Hide the bottom border if desired. */
    hideBorder?: boolean;
    /** Additional CSS classes to apply to the bar. */
    className?: string;
    /** Whether to show the user dropdown. */
    showUserDropdown?: boolean;
    /** Sidebar items to derive the root breadcrumb label from (matches activeUrl). */
    sidebarItems?: NavItemType[];
    /** Optional breadcrumb trail to display on the left. If omitted, it is generated from `activeUrl`. */
    breadcrumbs?: BreadcrumbItem[];
}

export const HeaderTopActions = ({
    activeUrl,
    hideBorder = false,
    className,
    showUserDropdown = true,
    sidebarItems,
    breadcrumbs,
}: HeaderTopActionsProps) => {
    const findMatchingNav = useMemo(() => {
        const flattenNav = (items: NavItemType[], path: string): NavItemType | undefined => {
            return items.reduce<NavItemType | undefined>((bestMatch, item) => {
                if (!item.href) return bestMatch;
                const isCurrentMatch = path.startsWith(item.href);
                const isBetterMatch = isCurrentMatch && (!bestMatch || (bestMatch.href && item.href.length > bestMatch.href.length));

                let match = bestMatch;
                if (isBetterMatch) {
                    match = item;
                }

                if (item.items && item.items.length > 0) {
                    const childMatch = flattenNav(item.items as NavItemType[], path);
                    if (childMatch && childMatch.href && path.startsWith(childMatch.href)) {
                        if (!match || (match.href && childMatch.href.length > match.href.length)) {
                            match = childMatch;
                        }
                    }
                }

                return match;
            }, undefined);
        };

        return (path: string) => (sidebarItems && path ? flattenNav(sidebarItems, path) : undefined);
    }, [sidebarItems]);

    const computedBreadcrumbs = useMemo<BreadcrumbItem[]>(() => {
        const formatSegment = (segment: string) =>
            segment
                .split("-")
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" ");

        if (!activeUrl) {
            return [];
        }

        const items: BreadcrumbItem[] = [];

        const navMatch = findMatchingNav(activeUrl);
        let remainingPath = activeUrl;

        if (navMatch) {
            items.push({ label: navMatch.label, href: navMatch.href });
            if (navMatch.href) {
                remainingPath = activeUrl.slice(navMatch.href.length);
            }
        }

        const remainingSegments = remainingPath.split("/").filter(Boolean);
        let path = navMatch?.href ?? "";

        remainingSegments.forEach((segment) => {
            path += `/${segment}`;
            items.push({
                label: formatSegment(segment),
                href: path || "/",
            });
        });

        return items;
    }, [activeUrl, findMatchingNav]);

    const crumbs = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : computedBreadcrumbs;

    const handleBreadcrumbClick = (crumb: BreadcrumbItem) => {
        const target = crumb.href || activeUrl || (typeof window !== "undefined" ? window.location.pathname : "/");

        if (typeof window !== "undefined") {
            window.location.assign(target);
        }
    };

    return (
        <div
            className={cx(
                "flex h-14 items-center justify-between gap-6 bg-primary px-4 md:px-8",
                !hideBorder && "border-b border-secondary",
                className,
            )}
        >
            <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center">
                <ol className="flex min-w-0 items-center gap-2 text-sm text-tertiary">
                    {crumbs.map((crumb, index) => {
                        const isLast = index === crumbs.length - 1;
                        return (
                            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-current={isLast ? "page" : undefined}
                                    onClick={() => handleBreadcrumbClick(crumb)}
                                    className={cx(
                                        "truncate bg-transparent p-0 text-left text-sm font-semibold text-secondary outline-focus-ring hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                                        isLast && "text-primary",
                                    )}
                                >
                                    {crumb.label}
                                </button>
                                {!isLast && <span className="text-secondary">{">"}</span>}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            <div className="flex items-center gap-1.5">
                <NavItemButton
                    current={activeUrl === "/settings-01"}
                    size="md"
                    icon={Settings01}
                    label="Settings"
                    href="/settings-01"
                    tooltipPlacement="bottom"
                />
                <NavItemButton
                    current={activeUrl === "/notifications-01"}
                    size="md"
                    icon={Bell01}
                    label="Notifications"
                    href="/notifications-01"
                    tooltipPlacement="bottom"
                />

                {showUserDropdown && (
                    <Dropdown.Root>
                        <Button
                            className="group min-w-[104px] justify-between"
                            color="secondary"
                            size="sm"
                            iconTrailing={ChevronDown}
                        >
                            ABC1234
                        </Button>

                        <Dropdown.Popover className="w-66">
                            <div className="flex items-center justify-between gap-3 border-b border-secondary p-3">
                                <AvatarLabelGroup
                                    size="md"
                                    src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                    status="online"
                                    title="Olivia Rhye"
                                    subtitle="olivia@untitledui.com"
                                />
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-primary">ABC1234</span>
                                    <span className="text-xs text-tertiary">Campus ID</span>
                                </div>
                            </div>

                            <Dropdown.Menu>
                                <Dropdown.Section>
                                    <Dropdown.Item addon="⌘K->P" icon={User01}>
                                        View profile
                                    </Dropdown.Item>
                                    <Dropdown.Item addon="⌘S" icon={Settings01}>
                                        Settings
                                    </Dropdown.Item>
                                </Dropdown.Section>
                                <Dropdown.Separator />
                                <Dropdown.Section>
                                    <Dropdown.Item icon={LayersTwo01}>Changelog</Dropdown.Item>
                                    <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                                    <Dropdown.Item icon={Container}>API</Dropdown.Item>
                                </Dropdown.Section>
                                <Dropdown.Separator />
                                <Dropdown.Section>
                                    <Dropdown.Item addon="⌥⇧Q" icon={LogOut01}>
                                        Log out
                                    </Dropdown.Item>
                                </Dropdown.Section>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                )}
            </div>
        </div>
    );
};

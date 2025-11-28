"use client";

import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { Fragment, useMemo } from "react";
import { usePathname } from "next/navigation";

import { appSidebarData } from "@/components/shadcn/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Separator } from "@/components/shadcn/ui/separator";
import { SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import { wcinypLocations } from "@/lib/wcinyp/locations";

type SiteHeaderBreadcrumb = {
    label: string;
    href?: string;
};

type SiteHeaderProps = {
    title?: string;
    actions?: React.ReactNode;
    showSidebarToggle?: boolean;
    breadcrumbs?: SiteHeaderBreadcrumb[];
};

const breadcrumbNavItems: SiteHeaderBreadcrumb[] = [
    ...appSidebarData.navMain.map((item) => ({ label: item.title, href: item.url })),
    ...appSidebarData.documents.map((item) => ({ label: item.name, href: item.url })),
    ...appSidebarData.admin.map((item) => ({ label: item.name, href: item.url })),
];

export function SiteHeader({ title = "Documents", actions, showSidebarToggle = true, breadcrumbs }: SiteHeaderProps) {
    const pathname = usePathname();

    const computedBreadcrumbs = useMemo<SiteHeaderBreadcrumb[]>(() => {
        if (!pathname) return [];

        const formatSegment = (segment: string) =>
            segment
                .split("-")
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" ");

        const effectivePath = pathname === "/" ? "/dashboard" : pathname;

        const navMatch = breadcrumbNavItems.reduce<SiteHeaderBreadcrumb | undefined>((bestMatch, item) => {
            if (!item.href) return bestMatch;

            const isCurrentMatch = effectivePath.startsWith(item.href);
            const isBetterMatch = isCurrentMatch && (!bestMatch?.href || item.href.length > bestMatch.href.length);

            return isBetterMatch ? item : bestMatch;
        }, undefined);

        const crumbs: SiteHeaderBreadcrumb[] = [];
        let remainingPath = effectivePath;

        if (navMatch && navMatch.href) {
            crumbs.push({ label: navMatch.label, href: navMatch.href });
            remainingPath = effectivePath.slice(navMatch.href.length);
        }

        const remainingSegments = remainingPath.split("/").filter(Boolean);
        let path = navMatch?.href ?? "";

        remainingSegments.forEach((segment) => {
            path += `/${segment}`;
            let href = path || "/";

            if (navMatch?.href === "/directory" && segment === "locations") {
                href = "/directory?tab=locations";
            }

            crumbs.push({
                label: formatSegment(segment),
                href,
            });
        });

        if (!crumbs.length) {
            const fallbackSegments = effectivePath.split("/").filter(Boolean);
            let pathAccumulator = "";

            fallbackSegments.forEach((segment) => {
                pathAccumulator += `/${segment}`;
                crumbs.push({
                    label: formatSegment(segment),
                    href: pathAccumulator || "/",
                });
            });
        }

        return crumbs;
    }, [pathname]);

    const resolvedBreadcrumbs = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : computedBreadcrumbs;
    const isLocationDetail = pathname?.startsWith("/directory/locations/") ?? false;

    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="flex flex-1 items-center gap-1 lg:gap-2">
                    {showSidebarToggle && (
                        <>
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                        </>
                    )}
                    <Breadcrumb>
                        <BreadcrumbList>
                            {resolvedBreadcrumbs.map((crumb, index) => {
                                const isLast = index === resolvedBreadcrumbs.length - 1;
                                const isLocationDropdown =
                                    isLocationDetail && isLast && crumb.href?.startsWith("/directory/locations/");

                                return (
                                    <Fragment key={`${crumb.label}-${index}`}>
                                        <BreadcrumbItem>
                                            {isLocationDropdown ? (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                                                        {crumb.label}
                                                        <ChevronDownIcon />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start">
                                                        {wcinypLocations.map((location) => (
                                                            <DropdownMenuItem key={location.id} asChild>
                                                                <Link href={`/directory/locations/${location.slug}`}>
                                                                    {location.name}
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            ) : isLast ? (
                                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href={crumb.href || "#"}>
                                                    {crumb.label}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!isLast && <BreadcrumbSeparator />}
                                    </Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
            </div>
        </header>
    );
}

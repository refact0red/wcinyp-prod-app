"use client"

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, File, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/shadcn/ui/sidebar";

type CloudNavItem = {
    title: string;
    url?: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: CloudNavItem[];
};

type TreeProps = {
    item: CloudNavItem;
    depth?: number;
};

const TreeNode = ({ item, depth = 0 }: TreeProps) => {
    const hasChildren = Boolean(item.items && item.items.length > 0);
    const defaultOpen = useMemo(() => Boolean(item.isActive), [item.isActive]);
    const [open, setOpen] = useState<boolean>(defaultOpen);

    useEffect(() => {
        if (item.isActive) {
            setOpen(true);
        }
    }, [item.isActive]);

    const handleToggle = (event: React.MouseEvent) => {
        if (!hasChildren) return;
        event.preventDefault();
        setOpen((prev) => !prev);
    };

    const content = hasChildren ? (
        <div className="flex items-center gap-2">
            <ChevronRight className={cn("size-4 shrink-0 transition-transform", open && "rotate-90")} />
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.title}</span>
        </div>
    ) : (
        <div className="flex items-center gap-2">
            <File className="size-4 shrink-0" />
            <span className="truncate">{item.title}</span>
        </div>
    );

    const Container = depth > 0 ? SidebarMenuSubItem : SidebarMenuItem;
    const ButtonComp = depth > 0 ? SidebarMenuSubButton : SidebarMenuButton;

    return (
        <Container className="flex flex-col gap-1">
            <ButtonComp
                asChild
                isActive={item.isActive}
                onClick={hasChildren ? handleToggle : undefined}
                className={cn(
                    "justify-start",
                    !hasChildren && "data-[active=true]:bg-transparent data-[active=true]:text-sidebar-foreground",
                )}
            >
                {hasChildren ? (
                    <button type="button" className="flex w-full items-center justify-between gap-2">
                        {content}
                    </button>
                ) : (
                    <a href={item.url || "#"} className="flex w-full items-center gap-2">
                        {content}
                    </a>
                )}
            </ButtonComp>

            {hasChildren ? (
                <SidebarMenuSub
                    className={cn(
                        "overflow-hidden pl-3 transition-[max-height,opacity]",
                        open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
                    )}
                >
                    {item.items?.map((child, index) => (
                        <TreeNode key={`${item.title}-${index}`} item={child} depth={depth + 1} />
                    ))}
                </SidebarMenuSub>
            ) : null}
        </Container>
    );
};

export function NavClouds({ items }: { items: CloudNavItem[] }) {
    const pathname = usePathname();

    const itemsWithActive = useMemo(
        () =>
            items.map(function normalize(item): CloudNavItem {
                const children = item.items?.map((child) => normalize(child));
                const childIsActive = children?.some((child) => child.isActive) ?? false;
                const selfIsActive = item.isActive ?? (item.url ? (pathname ?? "").startsWith(item.url) : false);

                return {
                    ...item,
                    items: children,
                    isActive: selfIsActive || childIsActive,
                };
            }),
        [items, pathname],
    );

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {itemsWithActive.map((item, index) => (
                        <TreeNode key={`${item.title}-${index}`} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

"use client";

import { FileIcon, FolderIcon } from "lucide-react";

import { NavClouds } from "@/components/shadcn/nav-clouds";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/shadcn/ui/sidebar";

const fileTree = [
    {
        title: "Capture HQ",
        icon: FolderIcon,
        url: "#",
        isActive: true,
        items: [
            { title: "Overview", url: "#", icon: FileIcon },
            { title: "Archive", url: "#", icon: FileIcon },
        ],
    },
    {
        title: "Data Library",
        icon: FolderIcon,
        url: "#",
        items: [
            { title: "Datasets", url: "#", icon: FileIcon },
            { title: "Exports", url: "#", icon: FileIcon },
        ],
    },
    {
        title: "Reports",
        icon: FolderIcon,
        url: "#",
        items: [
            { title: "Q1", url: "#", icon: FileIcon },
            { title: "Archive", url: "#", icon: FileIcon },
        ],
    },
];

export function DriveSidebar() {
    return (
        <Sidebar
            collapsible="none"
            className="bg-sidebar text-sidebar-foreground w-full min-w-[260px] rounded-lg border border-sidebar-border shadow-sm"
        >
            <SidebarHeader className="px-3 pt-3 pb-2">
                <p className="text-sm font-semibold leading-tight">Documents</p>
                <p className="text-xs text-sidebar-foreground/70">Browse folders</p>
            </SidebarHeader>
            <SidebarContent className="px-2 pb-3">
                <NavClouds items={fileTree} />
            </SidebarContent>
        </Sidebar>
    );
}

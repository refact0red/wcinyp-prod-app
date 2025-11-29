"use client";

import React from "react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Toaster } from "@/components/shadcn/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import { cn } from "@/lib/utils";

type LabShellProps = {
    title: string;
    actions?: React.ReactNode;
    ribbon?: React.ReactNode;
    toolbar?: React.ReactNode;
    children: React.ReactNode;
    layout?: "standard" | "flush";
};

export function LabShell({
    title,
    actions,
    ribbon,
    toolbar,
    children,
    layout = "standard",
}: LabShellProps) {
    const contentClasses =
        layout === "flush"
            ? "flex flex-1 flex-col"
            : "flex flex-col gap-4 py-4 md:gap-6 md:py-6";

    return (
        <SidebarProvider className="bg-sidebar">
            <AppSidebar />
            <SidebarInset>
                <SiteHeader title={title} actions={actions} showBreadcrumbs={false} />
                {ribbon}
                {toolbar}
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className={cn(contentClasses)}>{children}</div>
                    </div>
                </div>
            </SidebarInset>
            {/* TODO: Consider a banner slot here for global alerts; keep it below header and above main content. */}
            <Toaster />
        </SidebarProvider>
    );
}

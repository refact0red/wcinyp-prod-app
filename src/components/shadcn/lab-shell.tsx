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
    stickyChrome?: boolean;
};

export function LabShell({
    title,
    actions,
    ribbon,
    toolbar,
    children,
    layout = "standard",
    stickyChrome = false,
}: LabShellProps) {
    const contentClasses =
        layout === "flush"
            ? "flex flex-1 flex-col"
            : "flex flex-col gap-4 py-4 md:gap-6 md:py-6";

    const containerClasses =
        layout === "flush"
            ? "container @container/main flex flex-1 flex-col"
            : "container @container/main flex flex-1 flex-col gap-2";

    return (
        <SidebarProvider className="bg-sidebar">
            <AppSidebar />
            <SidebarInset
                className={cn(stickyChrome && "min-h-svh h-svh overflow-hidden")}
                style={
                    stickyChrome
                        ? {
                              ["--lab-header-h" as string]: "48px",
                              ["--lab-ribbon-h" as string]: ribbon ? "44px" : "0px",
                              ["--lab-toolbar-h" as string]: toolbar ? "44px" : "0px",
                          }
                        : undefined
                }
            >
                <div
                    className={cn(stickyChrome && "sticky top-0 z-50 bg-background")}
                >
                    <SiteHeader title={title} actions={actions} showBreadcrumbs={false} />
                </div>
                {ribbon && (
                    <div
                        className={cn(
                            stickyChrome &&
                                "sticky z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
                        )}
                        style={stickyChrome ? { top: "var(--lab-header-h)" } : undefined}
                    >
                        {ribbon}
                    </div>
                )}
                {toolbar && (
                    <div
                        className={cn(
                            stickyChrome &&
                                "sticky z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
                        )}
                        style={
                            stickyChrome
                                ? {
                                      top: `calc(var(--lab-header-h) + var(--lab-ribbon-h))`,
                                  }
                                : undefined
                        }
                    >
                        {toolbar}
                    </div>
                )}
                <div
                    className={cn("flex flex-1 flex-col", stickyChrome && "min-h-0 overflow-hidden")}
                >
                    <div className={cn(containerClasses, stickyChrome && "min-h-0 flex-1 overflow-hidden")}>
                        <div className={cn(contentClasses, stickyChrome && "min-h-0 overflow-hidden")}>
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
            {/* TODO: Consider a banner slot here for global alerts; keep it below header and above main content. */}
            <Toaster />
        </SidebarProvider>
    );
}

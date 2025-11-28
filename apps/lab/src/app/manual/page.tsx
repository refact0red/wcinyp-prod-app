import type { Metadata } from "next";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { SiteSubHeader } from "@/components/shadcn/site-subheader";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

export const metadata: Metadata = {
    title: "Manual",
};

export default function ManualPage() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Manual" />
                <SiteSubHeader
                    items={[
                        { label: "WCINYP", current: true },
                        { label: "BKM" },
                        { label: "STARR" },
                        { label: "LIC" },
                        { label: "BWY" },
                        { label: "DHK" },
                        { label: "E55TH" },
                        { label: "E61ST" },
                        { label: "SPIRAL" },
                        { label: "WGC" },
                    ]}
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-1 flex-col py-4 md:py-6" />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

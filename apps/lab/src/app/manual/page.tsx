import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

export default function ManualPage() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Manual" />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-1 flex-col py-4 md:py-6" />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

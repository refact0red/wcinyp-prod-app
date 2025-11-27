import type { Metadata } from "next";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { ChartAreaInteractive } from "@/components/shadcn/chart-area-interactive";
import { DataTable } from "@/components/shadcn/data-table";
import { SectionCards } from "@/components/shadcn/section-cards";
import { SiteHeader } from "@/components/shadcn/site-header";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

import data from "./data.json";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="container @container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

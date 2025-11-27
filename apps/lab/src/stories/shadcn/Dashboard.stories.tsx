import type { Meta, StoryObj } from "@storybook/react";

import data from "@/app/dashboard/data.json";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { ChartAreaInteractive } from "@/components/shadcn/chart-area-interactive";
import { DataTable } from "@/components/shadcn/data-table";
import { SectionCards } from "@/components/shadcn/section-cards";
import { SiteHeader } from "@/components/shadcn/site-header";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

const DashboardStory = () => (
    <SidebarProvider>
        <div className="flex min-h-[85vh] overflow-hidden rounded-xl border border-border shadow-md">
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
        </div>
    </SidebarProvider>
);

const meta = {
    title: "Shadcn/Dashboard 01",
    component: DashboardStory,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DashboardStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <DashboardStory />,
};

export default meta;

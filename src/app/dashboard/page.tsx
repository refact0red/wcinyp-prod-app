/* eslint-disable react/jsx-no-useless-fragment */
"use client";

import type { Metadata } from "next";
import { ChartAreaInteractive } from "@/components/shadcn/chart-area-interactive";
import { DataTable } from "@/components/shadcn/data-table";
import { LabShell } from "@/components/shadcn/lab-shell";
import { SectionCards } from "@/components/shadcn/section-cards";
import { SiteSubHeader } from "@/components/shadcn/site-subheader";
import { LayoutDashboardIcon, BellIcon, LineChartIcon, BookmarkIcon, CalendarClockIcon, UsersIcon } from "lucide-react";

import data from "./data.json";

export default function Page() {
  return (
    <LabShell
      title="Dashboard"
      ribbon={
        <SiteSubHeader
          items={[
            { label: "Overview", href: "/dashboard", current: true, icon: LayoutDashboardIcon },
            { label: "Notifications", href: "#", icon: BellIcon },
            { label: "Analytics", href: "#", icon: LineChartIcon },
            { label: "Saved reports", href: "#", icon: BookmarkIcon },
            { label: "Scheduled reports", href: "#", icon: CalendarClockIcon },
            { label: "User reports", href: "#", icon: UsersIcon },
          ]}
        />
      }
    >
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
    </LabShell>
  );
}

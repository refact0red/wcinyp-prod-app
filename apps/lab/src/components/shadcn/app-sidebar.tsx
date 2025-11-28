"use client"

import * as React from "react"
import {
  BarChart3Icon,
  BookIcon,
  BotIcon,
  CameraIcon,
  BlocksIcon,
  CalendarDaysIcon,
  CircleUserRoundIcon,
  ClipboardClockIcon,
  HardDriveIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/shadcn/nav-documents"
import { NavMain } from "@/components/shadcn/nav-main"
import { NavSecondary } from "@/components/shadcn/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"

export const appSidebarData = {
  user: {
    name: "Neo",
    email: "taa001@med.cornell.edu",
    avatar: "/avatars/neo-matrix.png",
    initials: "TA",
  },
  navMain: [
    {
      title: "Drive",
      url: "/drive",
      icon: HardDriveIcon,
    },
    {
      title: "Directory",
      url: "/directory",
      icon: UsersIcon,
    },
    {
      title: "Manual",
      url: "/manual",
      icon: BookIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
  documents: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Timesheet",
      url: "#",
      icon: ClipboardClockIcon,
    },
    {
      name: "Calendar",
      url: "#",
      icon: CalendarDaysIcon,
    },
    {
      name: "Self-Pay Automation",
      url: "#",
      icon: BotIcon,
    },
    {
      name: "EPIC DAR",
      url: "#",
      icon: BarChart3Icon,
    },
    {
      name: "AMION",
      url: "#",
      icon: CircleUserRoundIcon,
    },
    {
      name: "Team",
      url: "#",
      icon: CircleUserRoundIcon,
    },
  ],
  admin: [
    {
      name: "Users",
      url: "/admin/users",
      icon: UsersIcon,
    },
    {
      name: "Locations",
      url: "/admin/locations",
      icon: BlocksIcon,
    },
    {
      name: "Staff",
      url: "/admin/staff",
      icon: BlocksIcon,
    },
  ],
}

function WciLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="48"
        cy="48"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
      />
      <path
        d="M32 30h32v22c0 10.5-7 20-16 23.5C39 72 32 62.5 32 52Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M36 38h24"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="inline-flex">
                  <WciLogoIcon className="h-6 w-6" />
                </span>
                <span className="text-base font-semibold">Weill Cornell Imaging</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appSidebarData.navMain} />
        <NavDocuments label="Experimental" items={appSidebarData.documents} />
        <NavDocuments label="Admin" items={appSidebarData.admin} />
        <NavSecondary items={appSidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}

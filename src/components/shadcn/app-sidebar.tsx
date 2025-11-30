"use client"

import * as React from "react"
import {
  BarChart3Icon,
  BookIcon,
  CameraIcon,
  BlocksIcon,
  CalendarDaysIcon,
  CircleUserRoundIcon,
  ClipboardClockIcon,
  HardDriveIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/shadcn/nav-main"
import { NavClouds } from "@/components/shadcn/nav-clouds"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/shadcn/ui/sidebar"

const experimentalItems = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "3D Models",
    url: "/experimental/3d-models",
    icon: FileIcon,
  },
  {
    name: "Calendar",
    url: "#",
    icon: CalendarDaysIcon,
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
]

const adminItems = [
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
  {
    name: "Feedback",
    url: "/admin/feedback",
    icon: FileIcon,
  },
]

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
      title: "Teams",
      url: "/teams",
      icon: CircleUserRoundIcon,
    },
    {
      title: "Manual",
      url: "/manual",
      icon: BookIcon,
    },
    {
      title: "Timesheet",
      url: "/timesheet",
      icon: ClipboardClockIcon,
    },
  ],
  navClouds: [
    {
      title: "Experimental",
      icon: FileCodeIcon,
      items: experimentalItems.map((item) => ({
        title: item.name,
        url: item.url,
        icon: item.icon,
      })),
    },
    {
      title: "Admin",
      icon: FileTextIcon,
      items: adminItems.map((item) => ({
        title: item.name,
        url: item.url,
        icon: item.icon,
      })),
    },
  ],
  navSecondary: [
  ],
  documents: experimentalItems,
  admin: adminItems,
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
    <Sidebar collapsible="icon" variant="sidebar" className="border-0" {...props}>
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
        <NavClouds items={appSidebarData.navClouds} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

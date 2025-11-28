"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  FolderIcon,
  HospitalIcon,
  IdCardIcon,
  MailIcon,
  MoreHorizontalIcon,
  RadiationIcon,
  SearchIcon,
  ShareIcon,
  StethoscopeIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/shadcn/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/shadcn/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const [openCommand, setOpenCommand] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpenCommand((open) => !open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleNavigate = React.useCallback(
    (url: string) => {
      setOpenCommand(false)
      router.push(url)
    },
    [router]
  )

  const getIsActive = React.useCallback(
    (href: string) => {
      if (!pathname) return false
      return pathname === href || pathname.startsWith(`${href}/`)
    },
    [pathname]
  )

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Search"
                type="button"
                onClick={() => setOpenCommand(true)}
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <SearchIcon />
                <span>Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={getIsActive(item.url)}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.title === "Directory" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        showOnHover
                        className="rounded-sm data-[state=open]:bg-accent"
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-40 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem onClick={() => handleNavigate("/directory?tab=people")}>
                        <UsersIcon className="mr-2 h-4 w-4" />
                        <span>People</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate("/directory?tab=locations")}>
                        <HospitalIcon className="mr-2 h-4 w-4" />
                        <span>Locations</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate("/directory?tab=radiologists")}>
                        <RadiationIcon className="mr-2 h-4 w-4" />
                        <span>Radiologists</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate("/directory?tab=providers")}>
                        <StethoscopeIcon className="mr-2 h-4 w-4" />
                        <span>Providers</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate("/directory?tab=npi")}>
                        <IdCardIcon className="mr-2 h-4 w-4" />
                        <span>NPI Lookup</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        showOnHover
                        className="rounded-sm data-[state=open]:bg-accent"
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-24 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem>
                        <FolderIcon />
                        <span>Open</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShareIcon />
                        <span>Share</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {items.map((item) => (
              <CommandItem
                key={item.title}
                value={`${item.title} ${item.url}`}
                onSelect={() => handleNavigate(item.url)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

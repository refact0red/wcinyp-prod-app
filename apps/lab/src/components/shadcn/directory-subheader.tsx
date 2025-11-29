"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Building2Icon, HospitalIcon, IdCardIcon, RadiationIcon, StethoscopeIcon, UsersIcon } from "lucide-react";

import { SiteSubHeader } from "@/components/shadcn/site-subheader";

export const directoryTabs = [
  {
    id: "wcinyp",
    label: "WCINYP",
    icon: Building2Icon,
    href: "/directory?tab=wcinyp",
  },
  {
    id: "people",
    label: "People",
    icon: UsersIcon,
    href: "/directory?tab=people",
  },
  {
    id: "locations",
    label: "Locations",
    icon: HospitalIcon,
    href: "/directory?tab=locations",
  },
  {
    id: "radiologists",
    label: "Radiologists",
    icon: RadiationIcon,
    href: "/directory?tab=radiologists",
  },
  {
    id: "providers",
    label: "Providers",
    icon: StethoscopeIcon,
    href: "/directory?tab=providers",
  },
  {
    id: "npi",
    label: "NPI Lookup",
    icon: IdCardIcon,
    href: "/directory?tab=npi",
  },
] as const;

export type DirectorySubHeaderTab = (typeof directoryTabs)[number]["id"];

type DirectorySubHeaderProps = {
  activeTab?: DirectorySubHeaderTab;
};

export function DirectorySubHeader({ activeTab: activeTabProp }: DirectorySubHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams?.get("tab") ?? undefined;
  const allowedTabs: DirectorySubHeaderTab[] = directoryTabs.map((tab) => tab.id);

  let active: DirectorySubHeaderTab = activeTabProp ?? "wcinyp";

  if (!activeTabProp) {
    if (pathname?.startsWith("/directory/locations/")) {
      active = "locations";
    } else if (tabFromUrl && allowedTabs.includes(tabFromUrl as DirectorySubHeaderTab)) {
      active = tabFromUrl as DirectorySubHeaderTab;
    }
  }

  const items = directoryTabs.map((tab) => ({
    label: tab.label,
    icon: tab.icon,
    href: tab.href,
    current: active === tab.id,
  }));

  return <SiteSubHeader items={items} />;
}

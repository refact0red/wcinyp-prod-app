"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { HospitalIcon, IdCardIcon, RadiationIcon, StethoscopeIcon, UsersIcon } from "lucide-react";

import { SiteSubHeader } from "@/components/shadcn/site-subheader";

export type DirectorySubHeaderTab = "people" | "locations" | "radiologists" | "providers" | "npi";

type DirectorySubHeaderProps = {
  activeTab?: DirectorySubHeaderTab;
};

export function DirectorySubHeader({ activeTab: activeTabProp }: DirectorySubHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabFromUrl = searchParams?.get("tab") ?? undefined;
  const allowedTabs: DirectorySubHeaderTab[] = ["people", "locations", "radiologists", "providers", "npi"];

  let active: DirectorySubHeaderTab = activeTabProp ?? "people";

  if (!activeTabProp) {
    if (pathname?.startsWith("/directory/locations/")) {
      active = "locations";
    } else if (tabFromUrl && allowedTabs.includes(tabFromUrl as DirectorySubHeaderTab)) {
      active = tabFromUrl as DirectorySubHeaderTab;
    }
  }

  const items = [
    {
      label: "People",
      icon: UsersIcon,
      href: "/directory",
      current: active === "people",
    },
    {
      label: "Locations",
      icon: HospitalIcon,
      href: "/directory?tab=locations",
      current: active === "locations",
    },
    {
      label: "Radiologists",
      icon: RadiationIcon,
      href: "/directory?tab=radiologists",
      current: active === "radiologists",
    },
    {
      label: "Providers",
      icon: StethoscopeIcon,
      href: "/directory?tab=providers",
      current: active === "providers",
    },
    {
      label: "NPI Lookup",
      icon: IdCardIcon,
      href: "/directory?tab=npi",
      current: active === "npi",
    },
  ];

  return <SiteSubHeader items={items} />;
}


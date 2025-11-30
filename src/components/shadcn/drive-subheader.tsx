"use client";

import { useSearchParams } from "next/navigation";
import { FileTextIcon, HardDriveIcon, LayersIcon, WorkflowIcon } from "lucide-react";

import { SiteSubHeader } from "@/components/shadcn/site-subheader";

// TODO: Incorporate history/shortcuts/favorites so recently viewed items are easy to reach without a dedicated tab.
export const driveModes = [
  {
    id: "documents",
    label: "Documents",
    icon: FileTextIcon,
    href: "/drive?mode=documents",
  },
  {
    id: "packets",
    label: "Packets",
    icon: LayersIcon,
    href: "/drive?mode=packets",
  },
  {
    id: "automations",
    label: "Automations",
    icon: WorkflowIcon,
    href: "/drive?mode=automations",
  },
  {
    id: "all",
    label: "Public Drive",
    icon: HardDriveIcon,
    href: "/drive?mode=all",
  },
] as const;

export type DriveMode = (typeof driveModes)[number]["id"];

type DriveSubHeaderProps = {
  activeMode?: DriveMode;
};

export function DriveSubHeader({ activeMode: activeModeProp }: DriveSubHeaderProps) {
  const searchParams = useSearchParams();

  const modeFromUrl = searchParams?.get("mode") ?? undefined;
  const allowedModes: DriveMode[] = driveModes.map((mode) => mode.id);

  let active: DriveMode = activeModeProp ?? "all";

  if (!activeModeProp && modeFromUrl && allowedModes.includes(modeFromUrl as DriveMode)) {
    active = modeFromUrl as DriveMode;
  }

  const items = driveModes.map((mode) => ({
    label: mode.label,
    icon: mode.icon,
    href: mode.href,
    current: active === mode.id,
  }));

  return <SiteSubHeader items={items} />;
}

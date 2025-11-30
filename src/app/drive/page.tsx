import type { Metadata } from "next";

import { DrivePageClient } from "./drive-client";
import type { DriveMode } from "@/components/shadcn/drive-subheader";

export const metadata: Metadata = {
  title: "Drive",
};

type DrivePageSearchParams = Record<string, string | string[] | undefined>;

type DrivePageProps = {
  searchParams?: Promise<DrivePageSearchParams>;
};

export default async function DrivePage({ searchParams }: DrivePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const modeFromUrl = resolvedSearchParams.mode;
  const allowedModes: DriveMode[] = ["documents", "packets", "automations", "all"];

  const resolvedMode: DriveMode =
    typeof modeFromUrl === "string" && allowedModes.includes(modeFromUrl as DriveMode)
      ? (modeFromUrl as DriveMode)
      : "documents";

  return <DrivePageClient mode={resolvedMode} />;
}

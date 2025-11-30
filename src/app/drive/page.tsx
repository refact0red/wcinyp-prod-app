import type { Metadata } from "next";

import { DrivePageClient } from "./drive-client";
import type { DriveMode } from "@/components/shadcn/drive-subheader";
import type { DriveFile } from "@/app/drive/data";
import { fetchDriveFilesByMode } from "@/server/drive/files";

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

  const files: DriveFile[] = await fetchDriveFilesByMode(resolvedMode);

  return <DrivePageClient mode={resolvedMode} files={files} />;
}

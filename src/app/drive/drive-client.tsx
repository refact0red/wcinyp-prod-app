"use client";

import * as React from "react";
import { UploadCloudIcon } from "lucide-react";

import { DriveSidebar } from "./drive-sidebar";
import { DriveTable, DriveTableProvider } from "@/components/shadcn/drive-table";
import { DriveSubHeader, type DriveMode } from "@/components/shadcn/drive-subheader";
import { DriveToolbar } from "@/components/shadcn/drive-toolbar";
import { LabShell } from "@/components/shadcn/lab-shell";
import { Button } from "@/components/shadcn/ui/button";

type DrivePageClientProps = {
  mode: DriveMode;
};

export function DrivePageClient({ mode }: DrivePageClientProps) {
  const [mounted, setMounted] = React.useState(false);
  const driveLayoutStyle = React.useMemo(
    () => ({
      ["--drive-header-h" as string]: "42px",
    }),
    []
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DriveTableProvider>
      <LabShell
        title="Drive"
        actions={
          <Button size="sm">
            <UploadCloudIcon className="size-4" />
            Upload
          </Button>
        }
        ribbon={<DriveSubHeader activeMode={mode} />}
        toolbar={<DriveToolbar mode={mode} />}
        layout="flush"
      >
        <div className="flex flex-1 min-h-0">
          <div
            className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_280px] divide-x bg-card"
            style={driveLayoutStyle}
          >
            <div className="flex min-h-0 flex-col">
              <DriveTable />
            </div>
            <div className="flex min-h-0 flex-col">
              <DriveSidebar />
            </div>
          </div>
        </div>
      </LabShell>
    </DriveTableProvider>
  );
}

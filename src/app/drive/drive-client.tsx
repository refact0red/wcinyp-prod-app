"use client";

import * as React from "react";
import { DriveSidebar } from "./drive-sidebar";
import { DriveTable, DriveTableProvider } from "@/components/shadcn/drive-table";
import { DriveSubHeader, type DriveMode } from "@/components/shadcn/drive-subheader";
import { DriveToolbar } from "@/components/shadcn/drive-toolbar";
import { LabShell } from "@/components/shadcn/lab-shell";
import type { DriveFile } from "@/app/drive/data";

type DrivePageClientProps = {
  mode: DriveMode;
  files: DriveFile[];
};

export function DrivePageClient({ mode, files }: DrivePageClientProps) {
  const driveLayoutStyle = React.useMemo(
    () => ({
      ["--drive-header-h" as string]: "42px",
      ["--drive-viewport-h" as string]:
        "calc(100vh - var(--lab-header-h) - var(--lab-ribbon-h) - var(--lab-toolbar-h))",
    }),
    []
  );

  return (
    <DriveTableProvider mode={mode} files={files}>
      <LabShell
        title="Drive"
        stickyChrome
        ribbon={<DriveSubHeader activeMode={mode} />}
        toolbar={<DriveToolbar mode={mode} />}
        layout="flush"
      >
        <div
          className="flex min-h-0 flex-1 overflow-hidden"
          style={{ height: "var(--drive-viewport-h)" }}
        >
          <div
            className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_280px] divide-x overflow-hidden bg-card"
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

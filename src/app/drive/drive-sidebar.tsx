"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, FileTextIcon } from "lucide-react";

import { useDriveTableContext } from "@/components/shadcn/drive-table";
import { Button } from "@/components/shadcn/ui/button";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function DriveSidebar() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const { table, mode } = useDriveTableContext();

  const firstRow = table.getRowModel().rows[0];
  const item = firstRow?.original;
  const totalPages = 4;

  if (!item) {
    const emptyMessage =
      mode === "packets"
        ? "Packets will land here soon."
        : mode === "automations"
          ? "Automations will land here soon."
          : "No file selected.";
    return (
      <div className="flex h-full items-center justify-center bg-card px-4 text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? prev : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? prev : prev + 1));
  };

  return (
    <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] bg-card">
      <div className="flex h-[var(--drive-header-h)] items-center gap-2 border-b bg-muted/10 px-3 text-[11px] text-muted-foreground">
        <span className="inline-flex size-6 items-center justify-center rounded-sm bg-background shadow-xs">
          <FileTextIcon className="size-3.5 text-muted-foreground" />
        </span>
        <span className="line-clamp-1 text-xs font-medium text-foreground">{item.name}</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-auto">
        <div className="relative flex flex-1 flex-col overflow-hidden border-b bg-muted/40">
          <div className="flex flex-1 items-center justify-center bg-background px-3 py-3">
            <div className="flex h-full w-full max-h-[260px] max-w-[200px] items-center justify-center rounded-md border border-dashed border-muted-foreground/40 bg-muted/30 text-xs text-muted-foreground">
              Page {currentPage + 1}
            </div>
          </div>

          <div className="flex items-center justify-between border-t bg-muted/20 px-2 py-1.5 text-[11px] text-muted-foreground">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-sm"
                onClick={handlePrevious}
                disabled={currentPage === 0}
                aria-label="Previous page"
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-sm"
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                aria-label="Next page"
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 bg-card px-3 py-3 text-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            File details
          </p>
          <div className="mt-1 space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Name</span>
              <span className="max-w-[140px] truncate text-right font-medium">{item.name}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Type</span>
              <span className="text-right font-medium">{item.type}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Status</span>
              <span className="text-right font-medium">{item.status}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Last updated</span>
              <span className="max-w-[140px] truncate text-right font-medium">
                {formatDate(item.updated)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Size</span>
              <span className="text-right font-medium">{item.size}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

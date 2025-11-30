"use client";

import * as React from "react";
import { FilterIcon, SearchIcon } from "lucide-react";

import type { DriveMode } from "@/components/shadcn/drive-subheader";
import { ColumnVisibilityMenu } from "@/components/table/column-visibility-menu";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shadcn/ui/toggle-group";

import { useDriveTableContext } from "./drive-table";

type DriveToolbarProps = {
  mode: DriveMode;
};

export function DriveToolbar({ mode }: DriveToolbarProps) {
  const { table } = useDriveTableContext();
  const [panelMode, setPanelMode] = React.useState<"preview" | "queue">("preview");

  const searchPlaceholder = (() => {
    switch (mode) {
      case "packets":
        return "Search packets by name, workflow, or tags";
      case "documents":
        return "Search documents by name or type";
      case "automations":
        return "Search automations and form flows";
      case "all":
      default:
        return "Search Public Drive";
    }
  })();

  return (
    <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder={searchPlaceholder}
              className="h-8 w-full pl-9 text-sm"
              aria-label="Search Drive"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 px-2 text-xs"
          >
            <FilterIcon className="size-3.5" />
            Filters
          </Button>

          <ColumnVisibilityMenu table={table} />
        </div>

        <div className="flex items-center gap-3">
          <ToggleGroup
            type="single"
            size="sm"
            value={panelMode}
            onValueChange={(value) => {
              if (!value) return;
              setPanelMode(value as "preview" | "queue");
            }}
            aria-label="Drive side panel mode"
            className="hidden md:inline-flex"
          >
            <ToggleGroupItem value="preview" aria-label="Show preview panel">
              Preview
            </ToggleGroupItem>
            <ToggleGroupItem value="queue" aria-label="Show queue panel">
              Queue
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { ExternalLinkIcon } from "lucide-react";

import type { WcinypLocation } from "@/lib/wcinyp/locations";
import { wcinypStaff } from "@/lib/wcinyp/staff";
import { formatPhoneGroup, phoneHref } from "@/lib/wcinyp/phones";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";

export type DirectoryLocationsTableProps = {
  locations: WcinypLocation[];
  selectedLocationId?: string | null;
  onSelectLocation?: (id: string) => void;
  onOpenInMaps?: (location: WcinypLocation) => void;
  onLocationClick?: (location: WcinypLocation) => void;
  emptyMessage?: string;
  variant?: "card" | "plain";
  className?: string;
};

export function DirectoryLocationsTable({
  locations,
  selectedLocationId,
  onSelectLocation,
  onOpenInMaps,
  onLocationClick,
  emptyMessage,
  variant = "card",
  className,
}: DirectoryLocationsTableProps) {
  const staffById = React.useMemo(() => new Map(wcinypStaff.map((member) => [member.id, member])), []);

  const sortedLocations = React.useMemo(
    () =>
      [...locations].sort((a, b) => {
        const regionCompare = a.region.localeCompare(b.region);
        if (regionCompare !== 0) return regionCompare;
        return a.name.localeCompare(b.name);
      }),
    [locations]
  );

  if (!sortedLocations.length) {
    return (
      <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
        {emptyMessage ?? "No locations available yet."}
      </div>
    );
  }

  const tableContent = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[36%] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Location
          </TableHead>
          <TableHead className="w-[18%] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Region
          </TableHead>
          <TableHead className="w-[26%] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Modalities
          </TableHead>
          <TableHead className="w-[20%] text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Contact
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedLocations.map((location) => {
          const isSelected = location.id === selectedLocationId;
          const manager = location.managerStaffId ? staffById.get(location.managerStaffId) : undefined;
          const specialist =
            location.hasSpecialist && location.specialistStaffId ? staffById.get(location.specialistStaffId) : undefined;
          const phoneLabel = formatPhoneGroup(location.contact?.phone);
          const primaryDigits = location.contact?.phone?.primary.digits;
          const primaryHref = primaryDigits ? phoneHref(primaryDigits) : "";

          const handleSelect = () => {
            if (onSelectLocation) {
              onSelectLocation(location.id);
            }
            if (onLocationClick) {
              onLocationClick(location);
            }
          };

          const handleKeyDown: React.KeyboardEventHandler<HTMLTableRowElement> = (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleSelect();
            }
          };

          const handleMapsClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
            event.stopPropagation();
            if (onOpenInMaps) {
              onOpenInMaps(location);
            }
          };

          const handlePhoneClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
            event.stopPropagation();
          };

          return (
            <TableRow
              key={location.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              data-state={isSelected ? "selected" : undefined}
              onClick={handleSelect}
              onKeyDown={handleKeyDown}
              className={cn(
                "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected && "bg-primary/5"
              )}
            >
              <TableCell className="whitespace-normal align-top">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-tight text-primary">
                      {(location.akaShortCode ?? location.shortCode).toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold leading-snug text-foreground">{location.name}</span>
                  </div>
                  <div className="text-xs leading-snug text-muted-foreground">
                    {location.address.line1}
                    {location.address.line2 && (
                      <>
                        <br />
                        {location.address.line2}
                      </>
                    )}
                    {location.address.crossStreets && (
                      <>
                        <br />
                        {location.address.crossStreets}
                      </>
                    )}
                  </div>
                  {onOpenInMaps && (
                    <a
                      href={location.maps.placeUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={handleMapsClick}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Open in Maps
                      <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell className="whitespace-normal align-top text-xs leading-5 text-muted-foreground">
                <div className="text-sm font-medium text-foreground">{location.region}</div>
                <div>{location.borough}</div>
                {location.city && (
                  <div className="text-muted-foreground">
                    {location.city}, {location.state}
                  </div>
                )}
              </TableCell>
              <TableCell className="whitespace-normal align-top">
                <div className="flex flex-wrap gap-1.5">
                  {location.modalities.map((modality) => (
                    <Badge
                      key={modality}
                      variant="outline"
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                    >
                      {modality}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="whitespace-normal align-top text-xs leading-5">
                <div>
                  <span className="font-semibold text-muted-foreground">P:</span>{" "}
                  {phoneLabel ? (
                    primaryHref ? (
                      <a
                        href={primaryHref}
                        onClick={handlePhoneClick}
                        className="font-medium text-foreground underline-offset-2 hover:underline"
                      >
                        {phoneLabel}
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">{phoneLabel}</span>
                    )
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">PM:</span>{" "}
                  {manager ? (
                    <span className="font-medium text-foreground">{manager.name}</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
                {location.hasSpecialist && (
                  <div>
                    <span className="font-semibold text-muted-foreground">PS:</span>{" "}
                    {specialist ? (
                      <span className="font-medium text-foreground">{specialist.name}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  if (variant === "plain") {
    return <div className={cn("flex-1 min-h-0 w-full overflow-hidden", className)}>{tableContent}</div>;
  }

  return (
    <Card className={cn("border-border/70", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">List view</CardTitle>
      </CardHeader>
      <CardContent className="px-0">{tableContent}</CardContent>
    </Card>
  );
}

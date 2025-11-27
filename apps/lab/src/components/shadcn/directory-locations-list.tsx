"use client";

import * as React from "react";
import Image from "next/image";

import type { WcinypLocation } from "@/lib/wcinyp/locations";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shadcn/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";

export type DirectoryLocationsListProps = {
    locations: WcinypLocation[];
    selectedLocationId?: string | null;
    onSelectLocation?: (id: string) => void;
    onOpenInMaps?: (location: WcinypLocation) => void;
};

export function DirectoryLocationsList({
    locations,
    selectedLocationId,
    onSelectLocation,
    onOpenInMaps,
}: DirectoryLocationsListProps) {
    const sortedLocations = React.useMemo(
        () =>
            [...locations].sort((a, b) => {
                const regionCompare = a.region.localeCompare(b.region);
                if (regionCompare !== 0) return regionCompare;
                return a.name.localeCompare(b.name);
            }),
        [locations],
    );

    if (!sortedLocations.length) {
        return (
            <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
                No locations available yet.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sortedLocations.map((location) => {
                const isSelected = location.id === selectedLocationId;

                const handleSelect = () => {
                    if (!onSelectLocation) return;
                    onSelectLocation(location.id);
                };

                const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleSelect();
                    }
                };

                const handleOpenInMaps: React.MouseEventHandler<HTMLButtonElement> = (event) => {
                    event.stopPropagation();
                    if (!onOpenInMaps) return;
                    onOpenInMaps(location);
                };

                return (
                    <Card
                        key={location.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        onClick={handleSelect}
                        onKeyDown={handleKeyDown}
                        className={cn(
                            "group overflow-hidden border-border/70 bg-card text-left transition hover:border-primary/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isSelected && "border-primary bg-primary/5 shadow-md",
                        )}
                    >
                        <CardHeader className="flex flex-col gap-3 border-b border-border/40 pb-4 md:flex-row md:items-start">
                            <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border/40 bg-muted md:h-32 md:w-40 lg:w-48">
                                <Image
                                    src={location.image.src}
                                    alt={location.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, 100vw"
                                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-1">
                                <div className="flex items-start gap-2">
                                    <div className="flex-1">
                                        <CardTitle className="text-base font-semibold leading-snug">
                                            {location.name}
                                        </CardTitle>
                                        <CardDescription className="mt-1 text-xs leading-snug">
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
                                            <br />
                                            {location.city}, {location.state}
                                            {location.zip ? ` ${location.zip}` : ""}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-end">
                                        <Badge
                                            variant="outline"
                                            className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                                        >
                                            {location.region}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 pt-4">
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
                            {onOpenInMaps && (
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-xs"
                                        onClick={handleOpenInMaps}
                                    >
                                        View in Maps
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

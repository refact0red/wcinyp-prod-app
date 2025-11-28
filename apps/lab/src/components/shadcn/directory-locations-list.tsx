"use client";

import * as React from "react";
import Image from "next/image";

import type { WcinypLocation } from "@/lib/wcinyp/locations";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import { Badge } from "@/components/shadcn/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/ui/card";

export type DirectoryLocationsListProps = {
    locations: WcinypLocation[];
    selectedLocationId?: string | null;
    onSelectLocation?: (id: string) => void;
    onOpenInMaps?: (location: WcinypLocation) => void;
    onLocationClick?: (location: WcinypLocation) => void;
};

export function DirectoryLocationsList({
    locations,
    selectedLocationId,
    onSelectLocation,
    onOpenInMaps,
    onLocationClick,
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedLocations.map((location) => {
                const isSelected = location.id === selectedLocationId;

                const handleSelect = () => {
                    if (onSelectLocation) {
                        onSelectLocation(location.id);
                    }
                    if (onLocationClick) {
                        onLocationClick(location);
                    }
                };

                const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleSelect();
                    }
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
                        <CardHeader className="flex flex-col gap-2 pb-3 md:flex-row md:items-start">
                            <div className="flex flex-1 flex-col gap-1">
                                <CardTitle className="text-base font-semibold leading-snug">
                                    {location.name}
                                </CardTitle>
                                <CardDescription className="mt-1 text-xs leading-snug">
                                    {onOpenInMaps ? (
                                        <LocationMapsLink location={location} onOpenInMaps={onOpenInMaps}>
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
                                        </LocationMapsLink>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </CardDescription>
                            </div>
                            <AspectRatio ratio={3 / 1} className="w-full max-h-32 overflow-hidden rounded-lg border border-border/40 bg-muted md:w-40 lg:w-44">
                                <Image
                                    src={location.image.src}
                                    alt={location.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 176px, (min-width: 768px) 160px, 100vw"
                                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                                />
                            </AspectRatio>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 pt-3">
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
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

type LocationMapsLinkProps = {
    location: WcinypLocation;
    onOpenInMaps: (location: WcinypLocation) => void;
    children: React.ReactNode;
};

const LocationMapsLink = ({ location, onOpenInMaps, children }: LocationMapsLinkProps) => {
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.stopPropagation();
        onOpenInMaps(location);
    };

    return (
        <a
            href={location.maps.placeUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={handleClick}
            className="inline-block text-xs leading-snug text-primary underline-offset-4 hover:underline"
        >
            {children}
        </a>
    );
};

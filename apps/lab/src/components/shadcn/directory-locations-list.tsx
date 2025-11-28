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
        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

                const modalityRows: string[][] = [];
                {
                    const limits = [3, 3, 3];
                    let index = 0;

                    for (let row = 0; row < limits.length && index < location.modalities.length; row++) {
                        const limit = limits[row];
                        const rowItems = location.modalities.slice(index, index + limit);
                        index += limit;
                        if (!rowItems.length) break;
                        modalityRows.push(rowItems);
                    }

                    const estimatedWidth = (labels: string[]) =>
                        labels.reduce((total, label) => total + label.length, 0) + Math.max(labels.length - 1, 0) * 2;

                    if (modalityRows.length >= 2) {
                        let guard = 0;
                        while (
                            modalityRows[1].length > 0 &&
                            (modalityRows[2]?.length ?? 0) < limits[2] &&
                            estimatedWidth(modalityRows[1]) > estimatedWidth(modalityRows[0]) &&
                            guard < 3
                        ) {
                            const moved = modalityRows[1].pop() as string;
                            if (modalityRows[2]) {
                                modalityRows[2].push(moved);
                            } else {
                                modalityRows[2] = [moved];
                            }
                            guard += 1;
                        }
                    }
                }

                return (
                    <AspectRatio
                        key={location.id}
                        ratio={3.5 / 2}
                        className="w-full"
                    >
                        <Card
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSelected}
                            onClick={handleSelect}
                            onKeyDown={handleKeyDown}
                            className={cn(
                                "group flex h-full flex-col overflow-hidden border-border/70 bg-card px-4 py-3 text-left transition hover:border-primary/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                isSelected && "border-primary bg-primary/5 shadow-md",
                            )}
                        >
                            <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] grid-rows-[minmax(0,1fr)_auto] gap-x-3 gap-y-1">
                                {/* Top-left: AKA, name, address */}
                                <div className="flex min-w-0 flex-col gap-1">
                                    <div className="text-3xl font-semibold leading-none tracking-tight text-foreground">
                                        {(location.akaShortCode ?? location.shortCode).toUpperCase()}
                                    </div>
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
                                            </>
                                        )}
                                    </CardDescription>
                                </div>

                                {/* Top-right: image, rigid quadrant */}
                                <div className="flex items-start justify-end">
                                    <AspectRatio
                                        ratio={16 / 9}
                                        className="w-28 overflow-hidden rounded-lg border border-border/40 bg-muted md:w-32 lg:w-40"
                                    >
                                        <Image
                                            src={location.image.src}
                                            alt={location.image.alt}
                                            fill
                                            sizes="(min-width: 1024px) 176px, (min-width: 768px) 160px, 100vw"
                                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                                        />
                                    </AspectRatio>
                                </div>

                                {/* Bottom-left: Tel / Fax / PM / PS */}
                                <div className="flex flex-col justify-end gap-0.5 text-[11px] leading-snug text-muted-foreground">
                                    <div>
                                        T: <span className="font-medium text-foreground" />{" "}
                                        F: <span className="font-medium text-foreground" />
                                    </div>
                                    <div>
                                        PM: <span className="font-medium text-foreground" />
                                    </div>
                                    <div>
                                        PS: <span className="font-medium text-foreground" />
                                    </div>
                                </div>

                                {/* Bottom-right: modality tags (first row 4, then 3,3) */}
                                <div className="flex w-28 flex-col items-center gap-0.5 text-center md:w-32 lg:w-40">
                                    {modalityRows.map((rowItems, rowIndex) => (
                                        <div key={rowIndex} className="flex flex-nowrap justify-center gap-1.5">
                                            {rowItems.map((modality) => (
                                                <Badge
                                                    key={modality}
                                                    variant="outline"
                                                    className="rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
                                                >
                                                    {modality}
                                                </Badge>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </AspectRatio>
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

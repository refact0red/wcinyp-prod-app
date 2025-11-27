"use client";

import * as React from "react";

import type { WcinypLocation } from "@/lib/wcinyp/locations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";

export type DirectoryLocationsMapProps = {
    locations: WcinypLocation[];
    selectedLocationId?: string | null;
    onSelectLocation?: (id: string) => void;
};

export function DirectoryLocationsMap({ locations }: DirectoryLocationsMapProps) {
    const firstWithCoords = React.useMemo(
        () => locations.find((location) => Number.isFinite(location.maps.lat) && Number.isFinite(location.maps.lng)) ?? null,
        [locations],
    );

    const embedUrl = React.useMemo(() => {
        if (firstWithCoords) {
            const { lat, lng } = firstWithCoords.maps;
            const params = new URLSearchParams({
                q: `${lat},${lng}`,
                z: "13",
                output: "embed",
            });
            return `https://www.google.com/maps?${params.toString()}`;
        }

        // Fallback to a generic Manhattan-centered map if no coordinates are available.
        const fallbackParams = new URLSearchParams({
            q: "New York, NY",
            z: "11",
            output: "embed",
        });
        return `https://www.google.com/maps?${fallbackParams.toString()}`;
    }, [firstWithCoords]);

    // TODO: In the future, replace this iframe with a Google Maps JS API implementation that:
    // - Renders one marker per WCINYP location using maps.lat/maps.lng.
    // - Fits the map bounds to show all markers.
    // - Calls onSelectLocation(id) when a marker is clicked.
    // - Reacts to selectedLocationId by centering and showing an info window.

    return (
        <Card className="overflow-hidden border-border/70 bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Map view</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="relative h-64 w-full overflow-hidden rounded-md border border-border/60 bg-muted md:h-80">
                    <iframe
                        title="WCINYP locations map"
                        src={embedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full border-0"
                    />
                </div>
            </CardContent>
        </Card>
    );
}


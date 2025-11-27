"use client";

import * as React from "react";

import type { WcinypLocation } from "@/lib/wcinyp/locations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";

export type DirectoryLocationsMapProps = {
    locations: WcinypLocation[];
    selectedLocationId?: string | null;
    onSelectLocation?: (id: string) => void;
};

const ALL_LOCATIONS_EMBED_URL =
    "https://www.google.com/maps/d/embed?mid=1mvf1EJzbPJ7yEJcUZqaQnvi18XYfyKE&ehbc=2E312F";

export function DirectoryLocationsMap(_: DirectoryLocationsMapProps) {
    const embedUrl = ALL_LOCATIONS_EMBED_URL;

    // TODO: In the future, replace this static My Maps embed with a Google Maps JS API implementation that:
    // - Uses the locations prop (maps.lat/maps.lng) to render one marker per WCINYP location.
    // - Fits the map bounds to show all markers without relying on a prebuilt My Maps layer.
    // - Calls onSelectLocation(id) when a marker is clicked to sync with the locations list.
    // - Reacts to selectedLocationId by centering and showing an info window for the selected marker.

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

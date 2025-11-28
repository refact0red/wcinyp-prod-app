import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { DirectorySubHeader } from "@/components/shadcn/directory-subheader";
import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import { wcinypLocations } from "@/lib/wcinyp/locations";

type LocationPageProps = {
    params: {
        slug: string;
    };
};

export function generateMetadata({ params }: LocationPageProps): Metadata {
    const location = wcinypLocations.find((item) => item.slug === params.slug);

    if (!location) {
        return {
            title: "Location not found",
        };
    }

    return {
        title: location.name,
        description: `${location.name} in ${location.city}, ${location.state}`,
    };
}

export default function LocationPage({ params }: LocationPageProps) {
    const location = wcinypLocations.find((item) => item.slug === params.slug);

    if (!location) {
        notFound();
    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Directory" />
                <DirectorySubHeader activeTab="locations" />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Card className="overflow-hidden border-border/70 bg-card">
                                    <CardHeader className="flex flex-col gap-4 border-b border-border/40 pb-4 md:flex-row md:items-start">
                                        <AspectRatio
                                            ratio={16 / 9}
                                            className="w-full overflow-hidden rounded-lg border border-border/40 bg-muted md:w-64 lg:w-80"
                                        >
                                            <Image
                                                src={location.image.src}
                                                alt={location.image.alt}
                                                fill
                                                sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 100vw"
                                                className="object-cover"
                                            />
                                        </AspectRatio>
                                        <div className="flex flex-1 flex-col gap-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <CardTitle className="text-xl font-semibold leading-snug">
                                                    {location.name}
                                                </CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                                                >
                                                    {location.region}
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                                                >
                                                    {location.borough}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-sm leading-snug">
                                                <div>{location.address.line1}</div>
                                                {location.address.line2 && <div>{location.address.line2}</div>}
                                                {location.address.crossStreets && (
                                                    <div>{location.address.crossStreets}</div>
                                                )}
                                                <div>
                                                    {location.city}, {location.state}
                                                    {location.zip ? ` ${location.zip}` : ""}
                                                </div>
                                            </CardDescription>
                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 px-3 text-xs"
                                                >
                                                    <a
                                                        href={location.maps.placeUrl}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        Open in Google Maps
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4 pt-4">
                                        <div className="space-y-1">
                                            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                Modalities
                                            </h2>
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
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

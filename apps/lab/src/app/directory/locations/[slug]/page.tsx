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
import { wcinypStaff } from "@/lib/wcinyp/staff";
import { formatPhoneGroup, phoneHref } from "@/lib/wcinyp/phones";

export function generateMetadata({ params }: any): Metadata {
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

export default function LocationPage({ params }: any) {
    const location = wcinypLocations.find((item) => item.slug === params.slug);

    if (!location) {
        notFound();
    }

    const staffById = new Map(wcinypStaff.map((member) => [member.id, member]));

    const manager = location.managerStaffId ? staffById.get(location.managerStaffId) : undefined;
    const specialist =
        location.hasSpecialist && location.specialistStaffId ? staffById.get(location.specialistStaffId) : undefined;

    const phoneLabel = formatPhoneGroup(location.contact?.phone);
    const faxLabel = formatPhoneGroup(location.contact?.fax);

    const primaryDigits = location.contact?.phone?.primary.digits;
    const primaryHref = primaryDigits ? phoneHref(primaryDigits) : "";

    const formatHours = () => {
        const data = location.hoursOfOperation;
        if (!data || !data.ranges.length) return "Not specified";

        const dayOrder: Record<string, number> = {
            Mon: 1,
            Tue: 2,
            Wed: 3,
            Thu: 4,
            Fri: 5,
            Sat: 6,
            Sun: 7,
        };

        const labelForDays = (days: string[]) => {
            if (days.length === 7) return "Mon–Sun";
            const sorted = [...days].sort((a, b) => dayOrder[a] - dayOrder[b]);
            if (sorted.length === 1) return sorted[0];
            return `${sorted[0]}–${sorted[sorted.length - 1]}`;
        };

        const labelForTime = (time: string) => {
            const [hourStr, minuteStr] = time.split(":");
            let hour = Number.parseInt(hourStr, 10);
            const minute = minuteStr ?? "00";
            const suffix = hour >= 12 ? "pm" : "am";
            if (hour === 0) {
                hour = 12;
            } else if (hour > 12) {
                hour -= 12;
            }
            return `${hour}:${minute}${suffix}`;
        };

        return data.ranges
            .map((range) => `${labelForDays(range.days)} ${labelForTime(range.open)}–${labelForTime(range.close)}`)
            .join(", ");
    };

    const formatContrastHours = () => {
        const contrast = location.contrastHours;
        if (!contrast) return "Not specified";
        if (contrast.status === "tbd") return "TBD";
        if (contrast.status === "n/a") return "Contrast available during all open hours";
        return contrast.value || "Not specified";
    };

    const notes = location.locationNotes ?? [];

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
                                            <div className="flex flex-col gap-2">
                                                <div className="text-4xl font-semibold leading-none tracking-tight text-foreground">
                                                    {(location.akaShortCode ?? location.shortCode).toUpperCase()}
                                                </div>
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
                                        <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                        Contact & hours
                                                    </h2>
                                                    <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-3 text-sm leading-6">
                                                        <div>
                                                            <span className="font-semibold">Phone:</span>{" "}
                                                            {phoneLabel ? (
                                                                primaryHref ? (
                                                                    <a
                                                                        href={primaryHref}
                                                                        className="font-medium hover:underline"
                                                                    >
                                                                        {phoneLabel}
                                                                    </a>
                                                                ) : (
                                                                    <span className="font-medium">{phoneLabel}</span>
                                                                )
                                                            ) : (
                                                                <span className="text-muted-foreground">Not provided</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Fax:</span>{" "}
                                                            {faxLabel ? (
                                                                <span className="font-medium">{faxLabel}</span>
                                                            ) : (
                                                                <span className="text-muted-foreground">Not provided</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Hours of operation:</span>{" "}
                                                            <span>{formatHours()}</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Contrast hours:</span>{" "}
                                                            <span>{formatContrastHours()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                        Practice leadership
                                                    </h2>
                                                    <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-3 text-sm leading-6">
                                                        <div>
                                                            <span className="font-semibold">Practice manager:</span>{" "}
                                                            {manager ? (
                                                                <span className="font-medium">{manager.name}</span>
                                                            ) : (
                                                                <span className="text-muted-foreground">
                                                                    Not assigned
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="ml-4 text-xs text-muted-foreground">
                                                            {manager?.officePhone && (
                                                                <div>
                                                                    Office:{" "}
                                                                    <span className="font-medium">
                                                                        {formatPhoneGroup(manager.officePhone)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {manager?.mobilePhone && (
                                                                <div>
                                                                    Cell:{" "}
                                                                    <span className="font-medium">
                                                                        {formatPhoneGroup(manager.mobilePhone)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {manager?.email && (
                                                                <div>
                                                                    Email:{" "}
                                                                    <a
                                                                        href={`mailto:${manager.email}`}
                                                                        className="font-medium hover:underline"
                                                                    >
                                                                        {manager.email}
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="mt-2">
                                                            <span className="font-semibold">Practice specialist:</span>{" "}
                                                            {location.hasSpecialist ? (
                                                                specialist ? (
                                                                    <span className="font-medium">
                                                                        {specialist.name}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-muted-foreground">
                                                                        Not assigned
                                                                    </span>
                                                                )
                                                            ) : (
                                                                <span className="text-muted-foreground">N/A</span>
                                                            )}
                                                        </div>
                                                        {location.hasSpecialist && specialist && (
                                                            <div className="ml-4 text-xs text-muted-foreground">
                                                                {specialist.officePhone && (
                                                                    <div>
                                                                        Office:{" "}
                                                                        <span className="font-medium">
                                                                            {formatPhoneGroup(specialist.officePhone)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {specialist.mobilePhone && (
                                                                    <div>
                                                                        Cell:{" "}
                                                                        <span className="font-medium">
                                                                            {formatPhoneGroup(specialist.mobilePhone)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {specialist.email && (
                                                                    <div>
                                                                        Email:{" "}
                                                                        <a
                                                                            href={`mailto:${specialist.email}`}
                                                                            className="font-medium hover:underline"
                                                                        >
                                                                            {specialist.email}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {notes.length > 0 && (
                                                    <div className="space-y-1">
                                                        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                                            Additional notes
                                                        </h2>
                                                        <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-3 text-sm leading-6">
                                                            <ul className="list-disc space-y-1 pl-4">
                                                                {notes.map((note) => (
                                                                    <li key={note.id}>{note.text}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

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

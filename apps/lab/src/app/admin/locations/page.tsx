"use client";

import * as React from "react";
import { BlocksIcon, Edit2Icon, ImageUpIcon, LinkIcon } from "lucide-react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/shadcn/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";
import { wcinypLocations, type WcinypLocation, type WcinypBorough, type WcinypRegion } from "@/lib/wcinyp/locations";

type LocationFormState = {
    id: string;
    slug: string;
    shortCode: string;
    name: string;
    region: string;
    borough: string;
    line1: string;
    line2: string;
    crossStreets: string;
    city: string;
    state: string;
    zip: string;
    modalities: string;
    placeUrl: string;
    lat: string;
    lng: string;
    imageSrc: string;
    imageAlt: string;
};

const toFormState = (location: WcinypLocation): LocationFormState => ({
    id: location.id,
    slug: location.slug,
    shortCode: location.shortCode,
    name: location.name,
    region: location.region,
    borough: location.borough,
    line1: location.address.line1,
    line2: location.address.line2 ?? "",
    crossStreets: location.address.crossStreets ?? "",
    city: location.city,
    state: location.state,
    zip: location.zip ?? "",
    modalities: location.modalities.join(", "),
    placeUrl: location.maps.placeUrl,
    lat: location.maps.lat.toString(),
    lng: location.maps.lng.toString(),
    imageSrc: location.image.src,
    imageAlt: location.image.alt,
});

const updateLocationFromForm = (original: WcinypLocation, form: LocationFormState): WcinypLocation => {
    const normalizeList = (value: string) =>
        value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

    const parseNumber = (value: string, fallback: number) => {
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    };

    const normalizeShortCode = (value: string, fallback: string) => {
        const cleaned = value.trim().toUpperCase();
        const safe = cleaned.replace(/[^A-Z0-9_-]/g, "");
        return safe || fallback;
    };

    return {
        ...original,
        slug: original.slug,
        shortCode: normalizeShortCode(form.shortCode, original.shortCode),
        name: form.name.trim() || original.name,
        region: (form.region.trim() || original.region) as WcinypRegion,
        borough: (form.borough.trim() || original.borough) as WcinypBorough,
        address: {
            line1: form.line1.trim() || original.address.line1,
            line2: form.line2.trim() || undefined,
            crossStreets: form.crossStreets.trim() || undefined,
        },
        city: form.city.trim() || original.city,
        state: form.state.trim() || original.state,
        zip: form.zip.trim() || undefined,
        modalities: normalizeList(form.modalities),
        maps: {
            ...original.maps,
            placeUrl: form.placeUrl.trim() || original.maps.placeUrl,
            lat: parseNumber(form.lat, original.maps.lat),
            lng: parseNumber(form.lng, original.maps.lng),
        },
        image: {
            src: form.imageSrc.trim() || original.image.src,
            alt: form.imageAlt.trim() || original.image.alt,
        },
    };
};

const useImageDimensions = (src: string | null) => {
    const [state, setState] = React.useState<{
        status: "idle" | "loading" | "ready" | "error";
        width?: number;
        height?: number;
    }>({ status: "idle" });

    React.useEffect(() => {
        if (!src) {
            setState({ status: "idle" });
            return;
        }

        let cancelled = false;
        const img = new Image();

        img.onload = () => {
            if (cancelled) return;
            setState({ status: "ready", width: img.naturalWidth, height: img.naturalHeight });
        };

        img.onerror = () => {
            if (cancelled) return;
            setState({ status: "error" });
        };

        setState({ status: "loading" });
        img.src = src;

        return () => {
            cancelled = true;
        };
    }, [src]);

    return state;
};

const formatDimensions = (width?: number, height?: number) => {
    if (!width || !height) return null;
    return `${width}×${height}`;
};

const LocationImageCell = ({ src, alt }: { src: string; alt: string }) => {
    const meta = useImageDimensions(src);

    return (
        <div className="space-y-1 text-xs">
            <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 underline-offset-2 hover:underline"
            >
                <LinkIcon className="size-3.5" />
                <span className="line-clamp-2">Lobby image</span>
            </a>
            <div className="text-muted-foreground">
                {meta.status === "ready" && formatDimensions(meta.width, meta.height)}
                {meta.status === "loading" && "Loading dimensions…"}
                {meta.status === "error" && "Could not load image"}
            </div>
            <div className="text-muted-foreground line-clamp-2">{alt}</div>
        </div>
    );
};

export default function LocationsAdminPage() {
    const [locations, setLocations] = React.useState<WcinypLocation[]>(wcinypLocations);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [formState, setFormState] = React.useState<LocationFormState | null>(null);
    const [uploadedPreviewUrl, setUploadedPreviewUrl] = React.useState<string | null>(null);
    const previewMeta = useImageDimensions(formState?.imageSrc ?? null);

    const editingLocation = React.useMemo(
        () => (editingId ? locations.find((location) => location.id === editingId) ?? null : null),
        [editingId, locations],
    );

    React.useEffect(() => {
        if (!editingLocation) {
            setFormState(null);
            return;
        }
        setFormState(toFormState(editingLocation));
    }, [editingLocation]);

    React.useEffect(
        () => () => {
            if (uploadedPreviewUrl) {
                URL.revokeObjectURL(uploadedPreviewUrl);
            }
        },
        [uploadedPreviewUrl],
    );

    React.useEffect(() => {
        if (!editingLocation && uploadedPreviewUrl) {
            URL.revokeObjectURL(uploadedPreviewUrl);
            setUploadedPreviewUrl(null);
        }
    }, [editingLocation, uploadedPreviewUrl]);

    const normalize = (value?: string | null) => value?.trim() ?? "";

    const isDirty = React.useMemo(() => {
        if (!editingLocation || !formState) return false;
        const baseline = toFormState(editingLocation);
        return Object.keys(baseline).some((key) => normalize(formState[key as keyof LocationFormState]) !== normalize(baseline[key as keyof LocationFormState]));
    }, [editingLocation, formState]);

    const handleFieldChange =
        (field: keyof LocationFormState) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!formState) return;
            setFormState({ ...formState, [field]: event.target.value });
        };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!formState) return;
        const file = event.target.files?.[0];
        if (!file) return;

        if (uploadedPreviewUrl) {
            URL.revokeObjectURL(uploadedPreviewUrl);
        }

        const objectUrl = URL.createObjectURL(file);
        setUploadedPreviewUrl(objectUrl);
        setFormState({
            ...formState,
            imageSrc: objectUrl,
            imageAlt: formState.imageAlt || file.name,
        });
    };

    const handleEdit = (location: WcinypLocation) => {
        if (uploadedPreviewUrl) {
            URL.revokeObjectURL(uploadedPreviewUrl);
            setUploadedPreviewUrl(null);
        }
        setEditingId(location.id);
    };

    const handleClose = () => {
        setEditingId(null);
        setFormState(null);
    };

    const attemptClose = () => {
        if (isDirty) {
            const confirmed = typeof window === "undefined" ? true : window.confirm("Discard changes to this location?");
            if (!confirmed) return;
        }
        handleClose();
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingLocation || !formState) return;

        const updated = updateLocationFromForm(editingLocation, formState);

        setLocations((prev) => prev.map((loc) => (loc.id === updated.id ? updated : loc)));
        handleClose();
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Locations"
                    actions={
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <BlocksIcon className="size-4" />
                            <span>Managing shared WCINYP location primitives</span>
                        </div>
                    }
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardContent className="px-0">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[220px]">Location</TableHead>
                                                    <TableHead className="w-[160px]">Region / Borough</TableHead>
                                                    <TableHead>Address</TableHead>
                                                    <TableHead className="w-[220px]">Modalities</TableHead>
                                                    <TableHead className="w-[220px]">Image</TableHead>
                                                    <TableHead className="w-[80px]" />
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {locations.map((location) => (
                                                    <TableRow key={location.id}>
                                                        <TableCell className="font-medium">
                                                            <div>{location.name}</div>
                                                            <div className="text-xs text-muted-foreground">{location.shortCode}</div>
                                                        </TableCell>
                                                        <TableCell className="text-sm leading-tight">
                                                            <div>{location.region}</div>
                                                            <div className="text-xs text-muted-foreground">{location.borough}</div>
                                                        </TableCell>
                                                        <TableCell className="text-xs leading-snug text-muted-foreground">
                                                            <div>{location.address.line1}</div>
                                                            {location.address.line2 && <div>{location.address.line2}</div>}
                                                            {location.address.crossStreets && (
                                                                <div>{location.address.crossStreets}</div>
                                                            )}
                                                            <div>
                                                                {location.city}, {location.state}
                                                                {location.zip ? ` ${location.zip}` : ""}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-xs leading-snug">
                                                            {location.modalities.join(", ")}
                                                        </TableCell>
                                                        <TableCell className="text-xs leading-snug">
                                                            <LocationImageCell src={location.image.src} alt={location.image.alt} />
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="ml-auto"
                                                                onClick={() => handleEdit(location)}
                                                            >
                                                                <Edit2Icon className="size-4" />
                                                                <span className="sr-only">Edit location</span>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                <Sheet open={!!editingLocation && !!formState} onOpenChange={(open) => !open && attemptClose()}>
                    <SheetContent side="right" className="flex flex-col sm:max-w-md">
                        <SheetHeader>
                            <SheetTitle>Edit location</SheetTitle>
                        </SheetHeader>
                        {formState && (
                            <div className="flex-1 overflow-y-auto px-4 pr-5">
                                <form id="location-form" className="mt-4 space-y-4 pb-4" onSubmit={handleSave}>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-name">Name</Label>
                                            <Input
                                                id="loc-name"
                                                value={formState.name}
                                                onChange={handleFieldChange("name")}
                                                placeholder="Location name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-shortcode">Short code</Label>
                                            <Input
                                                id="loc-shortcode"
                                                value={formState.shortCode}
                                                onChange={handleFieldChange("shortCode")}
                                                placeholder="e.g., DHK"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-id">ID</Label>
                                            <Input id="loc-id" value={formState.id} readOnly />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-slug">Slug</Label>
                                            <Input id="loc-slug" value={formState.slug} readOnly />
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-region">Region</Label>
                                            <Input
                                                id="loc-region"
                                                value={formState.region}
                                                onChange={handleFieldChange("region")}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-borough">Borough</Label>
                                            <Input
                                                id="loc-borough"
                                                value={formState.borough}
                                                onChange={handleFieldChange("borough")}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="loc-line1">Address line 1</Label>
                                        <Input
                                            id="loc-line1"
                                            value={formState.line1}
                                            onChange={handleFieldChange("line1")}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="loc-line2">Address line 2</Label>
                                        <Input
                                            id="loc-line2"
                                            value={formState.line2}
                                            onChange={handleFieldChange("line2")}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="loc-cross">Cross streets / notes</Label>
                                        <Input
                                            id="loc-cross"
                                            value={formState.crossStreets}
                                            onChange={handleFieldChange("crossStreets")}
                                        />
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-city">City</Label>
                                            <Input
                                                id="loc-city"
                                                value={formState.city}
                                                onChange={handleFieldChange("city")}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-state">State</Label>
                                            <Input
                                                id="loc-state"
                                                value={formState.state}
                                                onChange={handleFieldChange("state")}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-zip">ZIP</Label>
                                            <Input
                                                id="loc-zip"
                                                value={formState.zip}
                                                onChange={handleFieldChange("zip")}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="loc-modalities">Modalities (comma separated)</Label>
                                        <Input
                                            id="loc-modalities"
                                            value={formState.modalities}
                                            onChange={handleFieldChange("modalities")}
                                            placeholder="MRI, CT, X-ray"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="loc-place-url">Google Maps URL</Label>
                                        <Input
                                            id="loc-place-url"
                                            value={formState.placeUrl}
                                            onChange={handleFieldChange("placeUrl")}
                                        />
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-lat">Latitude</Label>
                                            <Input
                                                id="loc-lat"
                                                value={formState.lat}
                                                onChange={handleFieldChange("lat")}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-lng">Longitude</Label>
                                            <Input
                                                id="loc-lng"
                                                value={formState.lng}
                                                onChange={handleFieldChange("lng")}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 rounded-lg border p-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="space-y-0.5">
                                                <div className="text-sm font-medium leading-none">Lobby image</div>
                                                <div className="text-xs text-muted-foreground">
                                                    Preview with current URL. Dimensions are also surfaced in the table.
                                                </div>
                                            </div>
                                            {previewMeta.status === "ready" && formatDimensions(previewMeta.width, previewMeta.height) && (
                                                <Badge variant="secondary">
                                                    {formatDimensions(previewMeta.width, previewMeta.height)}
                                                </Badge>
                                            )}
                                            {previewMeta.status === "loading" && <Badge variant="outline">Loading…</Badge>}
                                            {previewMeta.status === "error" && <Badge variant="destructive">Image error</Badge>}
                                        </div>

                                        <div className="aspect-video overflow-hidden rounded-md border bg-muted/50">
                                            {formState.imageSrc ? (
                                                <img
                                                    src={formState.imageSrc}
                                                    alt={formState.imageAlt || "Location lobby image"}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                                    No image provided
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-image-src">Image URL</Label>
                                            <Input
                                                id="loc-image-src"
                                                value={formState.imageSrc}
                                                onChange={handleFieldChange("imageSrc")}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-image-alt">Image alt text</Label>
                                            <Input
                                                id="loc-image-alt"
                                                value={formState.imageAlt}
                                                onChange={handleFieldChange("imageAlt")}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="loc-image-upload" className="flex items-center gap-1.5">
                                                <ImageUpIcon className="size-4 text-muted-foreground" />
                                                Upload replacement
                                            </Label>
                                            <Input
                                                id="loc-image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Uploading sets a temporary preview and replaces the URL value. Refreshing clears
                                                uploaded previews.
                                            </p>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        )}
                        <div className="border-t bg-card/80 px-4 pb-4 pt-3 backdrop-blur">
                            <div className="flex flex-col gap-2">
                                <Button type="submit" form="location-form">
                                    Save changes
                                </Button>
                                <Button type="button" variant="outline" onClick={attemptClose}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </SidebarInset>
        </SidebarProvider>
    );
}

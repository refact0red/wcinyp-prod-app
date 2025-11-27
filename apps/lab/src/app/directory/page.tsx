"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ExternalLink, HospitalIcon, IdCardIcon, Loader2, PlusIcon, RadiationIcon, Search, StethoscopeIcon, UsersIcon } from "lucide-react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { DirectoryLocationsList } from "@/components/shadcn/directory-locations-list";
import { DirectoryLocationsMap } from "@/components/shadcn/directory-locations-map";
import { DirectoryTable } from "@/components/shadcn/directory-table";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import type { NormalizedAddress, NormalizedNpiRecord, NpiLookupError, NpiLookupResponse } from "@/app/npi-lookup/types";
import { wcinypLocations, type WcinypLocation } from "@/lib/wcinyp/locations";

const formatAddress = (address?: NormalizedAddress) => address?.lines?.filter(Boolean).join("\n") || "—";

const formatSecondaryAddresses = (addresses: NormalizedAddress[]) => {
    if (!addresses.length) return "None on file.";

    const entries = addresses
        .map((address, index) => {
            const formatted = formatAddress(address);
            return formatted === "—" ? "" : `#${index + 1}\n${formatted}`;
        })
        .filter(Boolean);

    if (!entries.length) return "None on file.";

    return entries.join("\n\n");
};

const SummaryCard = ({ record }: { record: NormalizedNpiRecord }) => {
    const summary = [
        { label: "Sex", value: record.gender || "—" },
        { label: "NPI", value: record.npi || "—" },
        { label: "Last Updated", value: record.lastUpdated || "—" },
        { label: "Certification Date", value: record.certificationDate || "—" },
    ];

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-xl">{record.displayName}</CardTitle>
                <CardDescription>Results pulled live from the CMS NPPES NPI Registry.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {summary.map((item) => (
                    <div key={item.label} className="rounded-lg border border-border/60 bg-muted/40 px-3 py-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</div>
                        <div className="text-sm font-semibold leading-5 text-foreground">{item.value || "—"}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const DetailsTable = ({ record }: { record: NormalizedNpiRecord }) => {
    const rows = [
        { label: "NPI", value: record.npi || "—" },
        { label: "Enumeration Date", value: record.enumerationDate || "—" },
        { label: "NPI Type", value: record.npiType || "—" },
        { label: "Sole Proprietor", value: record.soleProprietor || "—" },
        { label: "Status", value: record.status || "—" },
        { label: "Mailing Address", value: formatAddress(record.mailingAddress) },
        { label: "Primary Practice Address", value: formatAddress(record.primaryPracticeAddress) },
        { label: "Secondary Practice Address(es)", value: formatSecondaryAddresses(record.secondaryPracticeAddresses) },
    ];

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <Table>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.label} className="align-top">
                                <TableHead className="w-56 whitespace-nowrap bg-muted/60 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground lg:w-64">
                                    {row.label}
                                </TableHead>
                                <TableCell className="whitespace-pre-line align-top text-sm leading-5">{row.value || "—"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

type TableSectionProps = {
    title: string;
    columns: string[];
    rows: string[][];
    emptyMessage: string;
};

const TableSection = ({ title, columns, rows, emptyMessage }: TableSectionProps) => (
    <Card>
        <CardHeader className="pb-4">
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column} className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                {column}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-sm text-muted-foreground">
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((cells, rowIndex) => (
                            <TableRow key={`${title}-${rowIndex}`} className="align-top">
                                {cells.map((cell, cellIndex) => (
                                    <TableCell key={`${title}-${rowIndex}-${cellIndex}`} className="whitespace-pre-line align-top text-sm leading-5">
                                        {cell || "—"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default function DirectoryPage() {
    const [npiInput, setNpiInput] = useState("");
    const [result, setResult] = useState<NormalizedNpiRecord | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

    const handleOpenLocationInMaps = (location: WcinypLocation) => {
        if (typeof window === "undefined") return;
        if (!location.maps.placeUrl) return;
        window.open(location.maps.placeUrl, "_blank", "noopener,noreferrer");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const trimmed = npiInput.trim();
        if (!/^\d{10}$/.test(trimmed)) {
            setResult(null);
            setError("Enter a 10-digit NPI before searching.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/npi-lookup?npi=${trimmed}`, { method: "GET" });
            const payload = (await response.json().catch(() => ({}))) as NpiLookupResponse | NpiLookupError | undefined;

            if (!response.ok) {
                const message = (payload as NpiLookupError | undefined)?.message ?? "Unable to fetch NPI details right now.";
                setResult(null);
                setError(message);
                return;
            }

            const data = (payload as NpiLookupResponse | undefined)?.data;
            setResult(data ?? null);
        } catch (err) {
            setResult(null);
            setError("Unable to reach the NPI Registry. Try again in a moment.");
        } finally {
            setIsLoading(false);
        }
    };

    const taxonomyRows = useMemo(
        () =>
            result?.taxonomies?.map((taxonomy) => [
                taxonomy.primary ? "Yes" : "No",
                taxonomy.code && taxonomy.desc ? `${taxonomy.code} - ${taxonomy.desc}` : taxonomy.code ?? taxonomy.desc ?? "—",
                taxonomy.state ?? "—",
                taxonomy.license ?? "—",
            ]) ?? [],
        [result],
    );

    const identifierRows = useMemo(
        () =>
            result?.identifiers?.map((identifier) => [
                identifier.issuer ?? "—",
                identifier.state ?? "—",
                identifier.number ?? "—",
                identifier.desc ?? identifier.code ?? "—",
            ]) ?? [],
        [result],
    );

    const endpointRows = useMemo(
        () =>
            result?.endpoints?.map((endpoint) => [
                endpoint.endpointType ?? "—",
                endpoint.endpoint ?? "—",
                endpoint.endpointDescription ?? "—",
                endpoint.use ?? "—",
                endpoint.contentType ?? "—",
                endpoint.affiliation ?? "—",
                endpoint.location ?? "—",
            ]) ?? [],
        [result],
    );

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Directory"
                    actions={
                        <Button size="sm">
                            <PlusIcon className="size-4" />
                            Add person
                        </Button>
                    }
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Tabs defaultValue="people" className="w-full">
                                    <TabsList className="w-fit">
                                        <TabsTrigger value="people" className="gap-2">
                                            <UsersIcon className="size-4" />
                                            People
                                        </TabsTrigger>
                                        <TabsTrigger value="locations" className="gap-2">
                                            <HospitalIcon className="size-4" />
                                            Locations
                                        </TabsTrigger>
                                        <TabsTrigger value="radiologists" className="gap-2">
                                            <RadiationIcon className="size-4" />
                                            Radiologists
                                        </TabsTrigger>
                                        <TabsTrigger value="providers" className="gap-2">
                                            <StethoscopeIcon className="size-4" />
                                            Providers
                                        </TabsTrigger>
                                        <TabsTrigger value="npi" className="gap-2">
                                            <IdCardIcon className="size-4" />
                                            NPI Lookup
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="people" className="mt-4">
                                        <DirectoryTable />
                                    </TabsContent>
                                    <TabsContent value="locations" className="mt-4">
                                        <div className="space-y-4">
                                            <DirectoryLocationsList
                                                locations={wcinypLocations}
                                                selectedLocationId={selectedLocationId}
                                                onSelectLocation={setSelectedLocationId}
                                                onOpenInMaps={handleOpenLocationInMaps}
                                            />
                                            <DirectoryLocationsMap
                                                locations={wcinypLocations}
                                                selectedLocationId={selectedLocationId}
                                                onSelectLocation={setSelectedLocationId}
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="radiologists" className="mt-4">
                                        <div className="text-sm text-muted-foreground">No radiologists yet.</div>
                                    </TabsContent>
                                    <TabsContent value="providers" className="mt-4">
                                        <div className="text-sm text-muted-foreground">No providers yet.</div>
                                    </TabsContent>
                                    <TabsContent value="npi" className="mt-4">
                                        <div className="flex flex-col gap-4">
                                            <Card>
                                                <CardHeader className="pb-4">
                                                    <CardTitle>NPI Lookup</CardTitle>
                                                    <CardDescription>
                                                        Search the CMS NPPES Registry by NPI. Blank cells reflect missing CMS data.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
                                                        <div className="flex-1 space-y-2">
                                                            <Label htmlFor="npi-input">NPI</Label>
                                                            <Input
                                                                id="npi-input"
                                                                inputMode="numeric"
                                                                pattern="[0-9]*"
                                                                maxLength={10}
                                                                placeholder="Enter 10-digit NPI (e.g. 1962458133)"
                                                                value={npiInput}
                                                                onChange={(event) => setNpiInput(event.target.value)}
                                                                aria-invalid={Boolean(error)}
                                                            />
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Button type="submit" size="default" disabled={isLoading}>
                                                                {isLoading ? (
                                                                    <>
                                                                        <Loader2 className="size-4 animate-spin" />
                                                                        Searching…
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Search className="size-4" />
                                                                        Search
                                                                    </>
                                                                )}
                                                            </Button>
                                                            <Button variant="outline" size="default" asChild>
                                                                <a
                                                                    href="https://npiregistry.cms.hhs.gov/"
                                                                    target="_blank"
                                                                    rel="noreferrer noopener"
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    Open CMS registry
                                                                    <ExternalLink className="size-4" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </CardContent>
                                            </Card>

                                            {error && (
                                                <Alert variant="destructive">
                                                    <AlertTitle>Unable to complete lookup</AlertTitle>
                                                    <AlertDescription>{error}</AlertDescription>
                                                </Alert>
                                            )}

                                            {result && (
                                                <div className="flex flex-col gap-4">
                                                    <SummaryCard record={result} />
                                                    <DetailsTable record={result} />

                                                    <TableSection
                                                        title="Taxonomy"
                                                        columns={["Primary Taxonomy", "Selected Taxonomy", "State", "License Number"]}
                                                        rows={taxonomyRows}
                                                        emptyMessage="No taxonomy information on file from CMS."
                                                    />

                                                    <TableSection
                                                        title="Other Identifiers"
                                                        columns={["Issuer", "State", "Number", "Other Issuer"]}
                                                        rows={identifierRows}
                                                        emptyMessage="No identifiers on file from CMS."
                                                    />

                                                    <TableSection
                                                        title="Health Information Exchange Endpoints"
                                                        columns={[
                                                            "Endpoint Type",
                                                            "Endpoint",
                                                            "Endpoint Description",
                                                            "Use",
                                                            "Content Type",
                                                            "Affiliation",
                                                            "Endpoint Location",
                                                        ]}
                                                        rows={endpointRows}
                                                        emptyMessage="No endpoints on file from CMS."
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

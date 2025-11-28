"use client";

import { useMemo, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExternalLink, IdCardIcon, Loader2, MapIcon, Search } from "lucide-react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { DirectoryLocationsList } from "@/components/shadcn/directory-locations-list";
import { DirectoryLocationsMap } from "@/components/shadcn/directory-locations-map";
import { DirectoryTable } from "@/components/shadcn/directory-table";
import { DirectorySubHeader } from "@/components/shadcn/directory-subheader";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/ui/toggle-group";
import type { NormalizedAddress, NormalizedNpiRecord, NpiLookupError, NpiLookupResponse } from "@/app/npi-lookup/types";
import { wcinypLocations, type WcinypLocation } from "@/lib/wcinyp/locations";

type DirectoryTab = "people" | "locations" | "radiologists" | "providers" | "npi";
type LocationsView = "cards" | "map";

const CMS_NPPES_REGISTRY_URL = "https://npiregistry.cms.hhs.gov/";

const CmsNppesRegistryLink = () => (
  <a
    href={CMS_NPPES_REGISTRY_URL}
    target="_blank"
    rel="noreferrer noopener"
    className="inline-flex items-center gap-1 text-primary font-medium underline-offset-4 hover:underline"
  >
    CMS NPPES Registry
    <ExternalLink className="size-3" aria-hidden="true" />
  </a>
);

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
        <CardDescription>
          Results pulled live from the <CmsNppesRegistryLink /> NPI Registry.
        </CardDescription>
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
                  <TableCell
                    key={`${title}-${rowIndex}-${cellIndex}`}
                    className="whitespace-pre-line align-top text-sm leading-5"
                  >
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

type LocationsViewToolbarProps = {
  activeView: LocationsView;
  availableModalities: string[];
  selectedModality?: string;
  onViewChange: (view: LocationsView) => void;
  onModalityChange: (value?: string) => void;
};

const LocationsViewToolbar = ({
  activeView,
  availableModalities,
  selectedModality,
  onViewChange,
  onModalityChange,
}: LocationsViewToolbarProps) => {
  if (!availableModalities.length) return null;

  return (
    <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex w-full items-center gap-4">
        <div className="flex items-center gap-3">
          <ToggleGroup
            type="single"
            value={activeView}
            onValueChange={(value) => {
              if (!value) return;
              onViewChange(value as LocationsView);
            }}
            variant="outline"
            size="sm"
            spacing={0}
          >
            <ToggleGroupItem value="cards">
              <IdCardIcon className="mr-1 size-3.5" />
              <span className="text-xs font-medium">Cards view</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="map">
              <MapIcon className="mr-1 size-3.5" />
              <span className="text-xs font-medium">Map view</span>
            </ToggleGroupItem>
          </ToggleGroup>
          {activeView === "cards" ? (
            <div className="ml-4 flex items-center gap-2 border-l border-border/80 pl-4 text-xs">
              <span className="font-medium text-muted-foreground">Modalities</span>
              <Select
                value={selectedModality ?? "all"}
                onValueChange={(value) => {
                  onModalityChange(value === "all" ? undefined : value);
                }}
              >
                <SelectTrigger size="sm" className="min-w-[10rem]">
                  <SelectValue placeholder="All modalities" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="all">All modalities</SelectItem>
                  {availableModalities.map((modality) => (
                    <SelectItem key={modality} value={modality}>
                      {modality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default function DirectoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleOpenLocationPage = (location: WcinypLocation) => {
    router.push(`/directory/locations/${location.slug}`);
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
    } catch {
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
    [result]
  );

  const identifierRows = useMemo(
    () =>
      result?.identifiers?.map((identifier) => [
        identifier.issuer ?? "—",
        identifier.state ?? "—",
        identifier.number ?? "—",
        identifier.desc ?? identifier.code ?? "—",
      ]) ?? [],
    [result]
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
    [result]
  );

  const tabFromUrl = searchParams?.get("tab") ?? undefined;
  const allowedTabs: DirectoryTab[] = ["people", "locations", "radiologists", "providers", "npi"];
  const activeTab: DirectoryTab = allowedTabs.includes(tabFromUrl as DirectoryTab) ? (tabFromUrl as DirectoryTab) : "people";

  const viewFromUrl = searchParams?.get("view") ?? undefined;
  const allowedViews: LocationsView[] = ["cards", "map"];
  const activeLocationsView: LocationsView =
    activeTab === "locations" && viewFromUrl && allowedViews.includes(viewFromUrl as LocationsView)
      ? (viewFromUrl as LocationsView)
      : "cards";

  const allModalities = useMemo(
    () =>
      Array.from(
        new Set(
          wcinypLocations.flatMap((location) => location.modalities)
        )
      ).sort((a, b) => a.localeCompare(b)),
    []
  );

  const [selectedModality, setSelectedModality] = useState<string | undefined>(undefined);

  const filteredLocations = useMemo(
    () =>
      selectedModality
        ? wcinypLocations.filter((location) => location.modalities.includes(selectedModality))
        : wcinypLocations,
    [selectedModality]
  );

  const handleChangeLocationsView = (view: LocationsView) => {
    if (view === activeLocationsView) return;

    const params = new URLSearchParams(searchParams?.toString());
    params.set("tab", "locations");

    if (view === "cards") {
      params.delete("view");
    } else {
      params.set("view", view);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Directory" />
        <DirectorySubHeader activeTab={activeTab} />
        {activeTab === "locations" && (
          <LocationsViewToolbar
            activeView={activeLocationsView}
            availableModalities={allModalities}
            selectedModality={selectedModality}
            onViewChange={handleChangeLocationsView}
            onModalityChange={setSelectedModality}
          />
        )}
        <div className="flex flex-1 flex-col">
          <div className="container @container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                {activeTab === "people" && (
                  <div className="mt-4">
                    <DirectoryTable />
                  </div>
                )}

                {activeTab === "locations" &&
                  (activeLocationsView === "cards" ? (
                    <div className="mt-4">
                      <DirectoryLocationsList
                        locations={filteredLocations}
                        selectedLocationId={selectedLocationId}
                        onSelectLocation={setSelectedLocationId}
                        onOpenInMaps={handleOpenLocationInMaps}
                        onLocationClick={handleOpenLocationPage}
                        emptyMessage={
                          selectedModality
                            ? "No locations match the selected modality."
                            : "No locations available yet."
                        }
                      />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <DirectoryLocationsMap
                        locations={wcinypLocations}
                        selectedLocationId={selectedLocationId}
                        onSelectLocation={setSelectedLocationId}
                        size="expanded"
                      />
                    </div>
                  ))}

                {activeTab === "radiologists" && (
                  <div className="mt-4 text-sm text-muted-foreground">No radiologists yet.</div>
                )}

                {activeTab === "providers" && (
                  <div className="mt-4 text-sm text-muted-foreground">No providers yet.</div>
                )}

                {activeTab === "npi" && (
                  <div className="mt-4 flex flex-col gap-4">
                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle>NPI Lookup</CardTitle>
                        <CardDescription>
                          Search the <CmsNppesRegistryLink /> by NPI.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
                          <div className="flex-1 space-y-2">
                            <Label htmlFor="npi-input">NPI number</Label>
                            <Input
                              id="npi-input"
                              value={npiInput}
                              onChange={(event) => setNpiInput(event.target.value)}
                              placeholder="Enter 10-digit NPI"
                              inputMode="numeric"
                              pattern="\d{10}"
                              maxLength={10}
                            />
                          </div>
                          <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <Button type="submit" disabled={isLoading} className="gap-2">
                              {isLoading ? (
                                <>
                                  <Loader2 className="size-4 animate-spin" />
                                  Looking up NPI…
                                </>
                              ) : (
                                <>
                                  <Search className="size-4" />
                                  Search
                                </>
                              )}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { useMemo, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ExternalLink, IdCardIcon, Loader2, MapIcon, Search } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { DirectoryLocationsList } from "@/components/shadcn/directory-locations-list";
import { DirectoryLocationsMap } from "@/components/shadcn/directory-locations-map";
import { DirectoryPeopleProvider, DirectoryTable } from "@/components/shadcn/directory-table";
import { DirectoryPeopleToolbar } from "@/components/shadcn/directory-people-toolbar";
import { DirectorySubHeader } from "@/components/shadcn/directory-subheader";
import { LabShell } from "@/components/shadcn/lab-shell";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/ui/toggle-group";
import type { NormalizedAddress, NormalizedNpiRecord, NpiLookupError, NpiLookupResponse } from "@/app/npi-lookup/types";
import { wcinypLocations, type WcinypLocation } from "@/lib/wcinyp/locations";
import { DirectoryRadiologistsGrid } from "@/components/shadcn/directory-radiologists-grid";
import { DirectoryRadiologistsToolbar } from "@/components/shadcn/directory-radiologists-toolbar";
import { wcinypRadiologists, type WcinypRadiologist } from "@/lib/wcinyp/radiologists";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/shadcn/ui/sheet";

type DirectoryTab = "people" | "locations" | "radiologists" | "providers" | "npi";
type LocationsView = "cards" | "map";
type DirectoryTabWithHome = DirectoryTab | "wcinyp";

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

  // TODO: Extract the ad-hoc editing patterns on this page (radiologist sheet,
  // NPI lookup states, etc.) into more standardized editing components and
  // workflows, including consistent use of Sonner toasts for feedback on save
  // / error, so admin-like flows feel uniform across the lab app.

  const [npiInput, setNpiInput] = useState("");
  const [result, setResult] = useState<NormalizedNpiRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [radiologists, setRadiologists] = useState<WcinypRadiologist[]>(wcinypRadiologists);
  const [radiologistSearch, setRadiologistSearch] = useState("");
  const [radiologistSpecialty, setRadiologistSpecialty] = useState<string | undefined>(undefined);
  const [isRadiologistSheetOpen, setIsRadiologistSheetOpen] = useState(false);
  const [selectedRadiologistId, setSelectedRadiologistId] = useState<string | null>(null);
  const [editingRadiologistId, setEditingRadiologistId] = useState<string | null>(null);
  const [radiologistForm, setRadiologistForm] = useState({
    name: "",
    profileUrl: "",
    specialties: "",
  });

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
  const allowedTabs: DirectoryTabWithHome[] = ["wcinyp", "people", "locations", "radiologists", "providers", "npi"];
  const activeTab: DirectoryTabWithHome =
    allowedTabs.includes(tabFromUrl as DirectoryTabWithHome) ? (tabFromUrl as DirectoryTabWithHome) : "wcinyp";

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

  const allRadiologistSpecialties = useMemo(
    () =>
      Array.from(
        new Set(
          radiologists.flatMap((rad) => rad.specialties)
        )
      ).sort((a, b) => a.localeCompare(b)),
    [radiologists]
  );

  const filteredRadiologists = useMemo(() => {
    const term = radiologistSearch.trim().toLowerCase();

    return radiologists.filter((rad) => {
      if (term) {
        const inName = rad.name.toLowerCase().includes(term);
        const inSpecialty = rad.specialties.some((spec) => spec.toLowerCase().includes(term));
        if (!inName && !inSpecialty) return false;
      }

      if (radiologistSpecialty && !rad.specialties.includes(radiologistSpecialty)) {
        return false;
      }

      return true;
    });
  }, [radiologists, radiologistSearch, radiologistSpecialty]);

  const canEditRadiologist =
    !!selectedRadiologistId && filteredRadiologists.some((rad) => rad.id === selectedRadiologistId);

  const handleOpenAddRadiologist = () => {
    setEditingRadiologistId(null);
    setRadiologistForm({
      name: "",
      profileUrl: "",
      specialties: "",
    });
    setIsRadiologistSheetOpen(true);
  };

  const handleSaveRadiologist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = radiologistForm.name.trim();
    if (!name) return;

    const slugify = (value: string) =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "radiologist";

    const id = editingRadiologistId ?? slugify(name);

    const specialties = radiologistForm.specialties
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean) as WcinypRadiologist["specialties"];

    const newRadiologist: WcinypRadiologist = {
      id,
      name,
      profileUrl: radiologistForm.profileUrl.trim(),
      headshot: {
        src: "/images/radiologists/placeholder.jpg",
        alt: name,
      },
      specialties,
      hasHeadshot: false,
    };

    setRadiologists((current) => {
      const exists = current.some((rad) => rad.id === id);
      if (exists) {
        return current.map((rad) => (rad.id === id ? newRadiologist : rad));
      }
      return [...current, newRadiologist];
    });

    setSelectedRadiologistId(id);
    setEditingRadiologistId(null);
    setIsRadiologistSheetOpen(false);
  };

  const handleOpenEditRadiologist = () => {
    if (!selectedRadiologistId) return;
    const rad = radiologists.find((item) => item.id === selectedRadiologistId);
    if (!rad) return;

    setEditingRadiologistId(rad.id);
    setRadiologistForm({
      name: rad.name,
      profileUrl: rad.profileUrl ?? "",
      specialties: rad.specialties.join(", "),
    });
    setIsRadiologistSheetOpen(true);
  };

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

  const locationsToolbar =
    activeTab === "locations" ? (
      <LocationsViewToolbar
        activeView={activeLocationsView}
        availableModalities={allModalities}
        selectedModality={selectedModality}
        onViewChange={handleChangeLocationsView}
        onModalityChange={setSelectedModality}
      />
    ) : null;

  const placeholderToolbar = (
    <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6" />
  );

  const npiToolbar =
    activeTab === "npi" ? (
      <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              id="npi-input"
              value={npiInput}
              onChange={(event) => setNpiInput(event.target.value)}
              placeholder="Enter 10-digit NPI"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              className="h-8 w-full pl-9 text-sm"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="h-8 gap-2 px-3 text-sm">
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
        </form>
      </div>
    ) : null;

  let toolbar: React.ReactNode = null;

  if (activeTab === "locations") {
    toolbar = locationsToolbar;
  } else if (activeTab === "people") {
    toolbar = <DirectoryPeopleToolbar />;
  } else if (activeTab === "npi") {
    toolbar = npiToolbar;
  } else if (activeTab === "radiologists") {
    toolbar = (
      <DirectoryRadiologistsToolbar
        search={radiologistSearch}
        onSearchChange={setRadiologistSearch}
        specialties={allRadiologistSpecialties}
        selectedSpecialty={radiologistSpecialty}
        onSpecialtyChange={setRadiologistSpecialty}
        onAddRadiologist={handleOpenAddRadiologist}
        onEditRadiologist={handleOpenEditRadiologist}
        canEditRadiologist={canEditRadiologist}
      />
    );
  } else if (activeTab === "providers" || activeTab === "wcinyp") {
    toolbar = placeholderToolbar;
  }

  const layout: "standard" | "flush" = activeTab === "people" ? "flush" : "standard";

  return (
    <DirectoryPeopleProvider>
      <LabShell
        title="Directory"
        ribbon={<DirectorySubHeader activeTab={activeTab} />}
        toolbar={toolbar}
        layout={layout}
      >
        {activeTab === "wcinyp" && (
          <div className="px-4 lg:px-6 text-sm text-muted-foreground">WCINYP overview coming soon.</div>
        )}

        {activeTab === "people" && <DirectoryTable />}

        {activeTab === "locations" &&
          (activeLocationsView === "cards" ? (
            <div className="px-4 lg:px-6">
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
            <div className="px-4 lg:px-6">
              <DirectoryLocationsMap
                locations={wcinypLocations}
                selectedLocationId={selectedLocationId}
                onSelectLocation={setSelectedLocationId}
                size="expanded"
              />
            </div>
          ))}

        {activeTab === "radiologists" && (
          <div className="px-4 lg:px-6">
            <DirectoryRadiologistsGrid
              radiologists={filteredRadiologists}
              selectedRadiologistId={selectedRadiologistId}
              onSelectRadiologist={setSelectedRadiologistId}
              emptyMessage={
                radiologistSearch || radiologistSpecialty
                  ? "No radiologists match the current search or specialty."
                  : "No radiologists available yet."
              }
            />
          </div>
        )}

        {activeTab === "providers" && (
          <div className="px-4 lg:px-6 text-sm text-muted-foreground">No providers yet.</div>
        )}

        {activeTab === "npi" && (
          <div className="flex flex-col gap-6 px-4 lg:px-6">
            <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center gap-3 text-center">
              <Search className="size-24 text-muted-foreground/80" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                Search the <CmsNppesRegistryLink />.
              </p>
            </div>

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
      </LabShell>

      <Sheet open={isRadiologistSheetOpen} onOpenChange={setIsRadiologistSheetOpen}>
        <SheetContent side="right" className="flex flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editingRadiologistId ? "Edit radiologist" : "Add radiologist"}</SheetTitle>
            <SheetDescription>
              Add a radiologist to this lab view. Changes here are not yet persisted to WCINYP production data.
            </SheetDescription>
          </SheetHeader>

          <form
            id="radiologist-form"
            className="mt-6 flex-1 space-y-4 overflow-y-auto px-4 pb-4 pr-5"
            onSubmit={handleSaveRadiologist}
          >
            <div className="space-y-1.5">
              <Label htmlFor="radiologist-name">Name</Label>
              <Input
                id="radiologist-name"
                value={radiologistForm.name}
                onChange={(event) => setRadiologistForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Full name, e.g. Jane Doe, M.D."
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="radiologist-profile-url">Profile URL</Label>
              <Input
                id="radiologist-profile-url"
                type="url"
                value={radiologistForm.profileUrl}
                onChange={(event) =>
                  setRadiologistForm((current) => ({ ...current, profileUrl: event.target.value }))
                }
                placeholder="https://weillcornell.org/example"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="radiologist-specialties">Specialties</Label>
              <Input
                id="radiologist-specialties"
                value={radiologistForm.specialties}
                onChange={(event) =>
                  setRadiologistForm((current) => ({ ...current, specialties: event.target.value }))
                }
                placeholder="Comma-separated, e.g. Breast Imaging, Abdominal Imaging"
              />
            </div>
          </form>

          <div className="border-t bg-card/80 px-4 pb-4 pt-3 backdrop-blur">
            <div className="flex flex-col gap-2">
              <Button type="submit" form="radiologist-form">
                {editingRadiologistId ? "Save changes" : "Add radiologist"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsRadiologistSheetOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </DirectoryPeopleProvider>
  );
}

"use client";

import type { ChangeEvent, ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";

import {
    Activity,
    BarChart2,
    Building2Icon,
    ClipboardList,
    CloudIcon,
    ChevronRight,
    Cloud,
    FileTextIcon,
    HardDriveIcon,
    HospitalIcon,
    IdCardIcon,
    LayersIcon,
    ListChecks,
    RadiationIcon,
    Search,
    Share2Icon,
    Shield,
    StethoscopeIcon,
    Upload,
    UserRound,
    UsersIcon,
    WorkflowIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type RailItemId = "drive" | "directory";

type RailItem = {
    id: RailItemId;
    label: string;
    icon: ComponentType<{ className?: string }>;
};

type DrivePanelId = "documents" | "packets" | "handouts" | "automations" | "public-drive";
type DirectoryPanelId = "wcinyp" | "staff" | "locations" | "radiologists" | "providers" | "npi-lookup";
type PanelItemId = DrivePanelId | DirectoryPanelId;

type PillNavItem = { id: string; label: string };

type PanelItem = {
    id: PanelItemId;
    title: string;
    path: string;
    icon: ComponentType<{ className?: string }>;
    status?: string;
};

const railItems: RailItem[] = [
    { id: "drive", label: "Drive", icon: HardDriveIcon },
    { id: "directory", label: "Directory", icon: UsersIcon },
];

const panelItems: Record<RailItemId, PanelItem[]> = {
    drive: [
        { id: "documents", title: "Documents", path: "/sandbox/drive/documents", status: "", icon: FileTextIcon },
        { id: "packets", title: "Packets", path: "/sandbox/drive/packets", status: "", icon: LayersIcon },
        { id: "handouts", title: "Handouts", path: "/sandbox/drive/handouts", status: "", icon: ClipboardList },
        { id: "automations", title: "Automations", path: "/sandbox/drive/automations", status: "", icon: WorkflowIcon },
        { id: "public-drive", title: "Public Drive", path: "/sandbox/drive/public-drive", status: "", icon: CloudIcon },
    ],
    directory: [
        { id: "wcinyp", title: "WCINYP", path: "/sandbox/directory/wcinyp", status: "", icon: Building2Icon },
        { id: "staff", title: "Staff", path: "/sandbox/directory/staff", status: "284", icon: UsersIcon },
        { id: "locations", title: "Locations", path: "/sandbox/directory/locations", status: "32", icon: HospitalIcon },
        { id: "radiologists", title: "Radiologists", path: "/sandbox/directory/radiologists", status: "", icon: RadiationIcon },
        { id: "providers", title: "Providers", path: "/sandbox/directory/providers", status: "", icon: StethoscopeIcon },
        { id: "npi-lookup", title: "NPI Lookup", path: "/sandbox/directory/npi-lookup", status: "", icon: IdCardIcon },
    ],
};

const defaultPanel: Record<RailItemId, PanelItemId> = {
    drive: "documents",
    directory: "wcinyp",
};

const pillNavItems: Partial<Record<PanelItemId, PillNavItem[]>> = {
    documents: [
        { id: "appointment", label: "Appointment" },
        { id: "bundles", label: "Bundles" },
        { id: "insurance-financial", label: "Insurance/ Financial" },
    ],
};

const documentRows = [
    {
        currentLoginDate: "2025-11-30",
        currentLoginTime: "10:11:58",
        device: "desktop",
        locationCountry: "United States",
        locationDetail: "(2607:fb90:5503:45e5:b0cf:a5ed:eca:cdcb)",
        firstLoginDate: "2025-11-30",
        firstLoginTime: "10:11:58",
        loginType: "google",
    },
    {
        currentLoginDate: "2025-11-29",
        currentLoginTime: "15:09:00",
        device: "desktop",
        locationCountry: "United States",
        locationDetail: "(140.251.71.72)",
        firstLoginDate: "2025-11-29",
        firstLoginTime: "15:09:00",
        loginType: "google",
    },
    {
        currentLoginDate: "2025-11-29",
        currentLoginTime: "12:17:33",
        device: "desktop",
        locationCountry: "United States",
        locationDetail: "(140.251.71.95)",
        firstLoginDate: "2025-11-29",
        firstLoginTime: "12:17:33",
        loginType: "google",
    },
];

function IconRail({
    activeId,
    onSelect,
}: {
    activeId: RailItemId;
    onSelect: (id: RailItemId) => void;
}) {
    return (
        <div className="sticky top-16 z-20 flex h-[calc(100vh-64px)] w-[72px] flex-col items-center gap-3 border-r bg-card px-3 py-4">
            {railItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeId;
                return (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={cn(
                            "flex h-[52px] w-[52px] items-center justify-center rounded-xl border text-muted-foreground transition",
                            isActive
                                ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
                                : "border-transparent hover:bg-muted"
                        )}
                        aria-current={isActive ? "page" : undefined}
                        type="button"
                    >
                        <Icon className="h-5 w-5" />
                    </button>
                );
            })}
        </div>
    );
}

export default function SandboxPage() {
    return <SandboxShell initialRail="drive" initialPanel="documents" />;
}

function SidebarPanel({
    items,
    activeId,
    onSelect,
}: {
    items: PanelItem[];
    activeId: PanelItemId;
    onSelect: (item: PanelItem) => void;
}) {
    return (
        <aside className="sticky top-16 z-10 hidden h-[calc(100vh-64px)] w-64 border-r bg-card lg:block">
            <div className="space-y-1 px-2 pb-4 pt-4">
                {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelect(item)}
                            className={cn(
                                "flex h-[52px] w-full items-center justify-between rounded-xl px-3 text-left transition hover:bg-muted",
                                isActive ? "border border-primary/40 bg-primary/10 text-primary shadow-sm" : "border border-transparent"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("h-5 w-5 text-muted-foreground", isActive && "text-primary")} />
                                <span className="text-sm font-semibold text-foreground">{item.title}</span>
                            </div>
                            {item.status ? (
                                <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-foreground">
                                    {item.status}
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}

function TopBar() {
    return (
        <header className="sticky top-0 z-30 grid h-16 grid-cols-[minmax(220px,auto)_1fr_minmax(56px,auto)] items-center gap-4 border-b bg-card px-6 py-3">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                    WC
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-foreground">WCINYP Sandbox</span>
                    <span className="text-xs text-muted-foreground">UI migration workspace</span>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[24rem] justify-self-center">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        className="h-9 w-full rounded-full border border-border bg-muted pl-9 pr-4 text-sm text-foreground outline-none transition focus:border-primary/60 focus:bg-card"
                        placeholder="Search"
                        type="search"
                    />
                </div>
            </div>
            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:text-foreground"
            >
                <UserRound className="h-4 w-4" />
            </button>
        </header>
    );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("rounded-2xl border border-border bg-card shadow-sm", className)}>
            {children}
        </div>
    );
}

function StatRow({
    label,
    value,
    hint,
    icon: Icon,
}: {
    label: string;
    value: string;
    hint?: string;
    icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-muted px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
                <span className="text-base font-semibold text-foreground">{value}</span>
                {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
            </div>
        </div>
    );
}

function MetricCard({
    title,
    value,
    sub,
    accent,
}: {
    title: string;
    value: string;
    sub?: string;
    accent?: string;
}) {
    return (
        <Card className="p-4">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{title}</p>
                    <p className="text-xl font-semibold text-foreground">{value}</p>
                    {sub ? <p className="text-sm text-muted-foreground">{sub}</p> : null}
                </div>
                {accent ? (
                    <div className="h-10 w-10 rounded-full" style={{ background: accent }} />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-muted" />
                )}
            </div>
        </Card>
    );
}

function UpgradeCard() {
    return (
        <Card className="flex flex-col gap-3 border-dashed bg-primary/5 p-5 text-foreground">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Cloud className="h-4 w-4" />
                    Upgrade for automated backups
                </div>
                <span className="text-xs font-semibold text-foreground">US$ 24.00 /mo</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Daily snapshots
                </div>
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Rollback safety
                </div>
                <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    One-click restore
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
                >
                    Upgrade
                </button>
                <button
                    type="button"
                    className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                    Dismiss
                </button>
            </div>
        </Card>
    );
}

function DocumentsTable({
    searchTerm,
    onSearchChange,
    rows,
}: {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    rows: typeof documentRows;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <Card className="overflow-hidden">
            <div className="border-b border-border bg-card px-5 py-4">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search"
                        className="h-11 w-full rounded-xl border border-border bg-muted px-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary/60 focus:bg-card"
                        type="search"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-foreground">
                    <thead className="bg-card">
                        <tr className="border-b border-border">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                <span className="inline-flex items-center gap-1">
                                    Current Login
                                    <ChevronRight className="-rotate-90 h-4 w-4 text-muted-foreground" />
                                </span>
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Device</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                <span className="inline-flex items-center gap-1">
                                    First Login
                                    <ChevronRight className="-rotate-90 h-4 w-4 text-muted-foreground" />
                                </span>
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Login Type</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {rows.map((row) => (
                            <tr key={`${row.currentLoginDate}-${row.currentLoginTime}`} className="bg-card">
                                <td className="px-6 py-4 align-top">
                                    <div className="text-sm font-semibold text-foreground">{row.currentLoginDate}</div>
                                    <div className="text-sm text-muted-foreground">{row.currentLoginTime}</div>
                                </td>
                                <td className="px-6 py-4 align-top text-sm text-foreground">{row.device}</td>
                                <td className="px-6 py-4 align-top text-sm text-foreground">
                                    <div>{row.locationCountry}</div>
                                    {row.locationDetail ? <div className="text-muted-foreground">{row.locationDetail}</div> : null}
                                </td>
                                <td className="px-6 py-4 align-top">
                                    <div className="text-sm font-semibold text-foreground">{row.firstLoginDate}</div>
                                    <div className="text-sm text-muted-foreground">{row.firstLoginTime}</div>
                                </td>
                                <td className="px-6 py-4 align-top text-sm text-foreground">{row.loginType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export function SandboxShell({
    initialRail = "drive",
    initialPanel,
}: {
    initialRail?: RailItemId;
    initialPanel?: PanelItemId;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeRail, setActiveRail] = useState<RailItemId>(initialRail);
    const [activePanel, setActivePanel] = useState<PanelItemId>(initialPanel ?? defaultPanel[initialRail]);
    const [activePill, setActivePill] = useState<string | null>(null);
    const [documentSearch, setDocumentSearch] = useState<string>("");

    useEffect(() => {
        if (!pathname) return;
        const parts = pathname.split("/").filter(Boolean);
        if (parts[0] !== "sandbox") return;

        const railSegment = parts[1];
        const slug = parts[2];
        const nextRail: RailItemId = railSegment === "directory" ? "directory" : "drive";
        const panelMatch = panelItems[nextRail].find((item) => item.id === slug);
        setActiveRail(nextRail);
        setActivePanel(panelMatch?.id ?? defaultPanel[nextRail]);
    }, [pathname]);

    useEffect(() => {
        const pills = pillNavItems[activePanel];
        setActivePill(pills?.[0]?.id ?? null);
    }, [activePanel]);

    useEffect(() => {
        if (activePanel !== "documents") {
            setDocumentSearch("");
        }
    }, [activePanel]);

    const handleRailSelect = (id: RailItemId) => {
        const target = panelItems[id][0];
        if (target) {
            router.push(target.path);
        }
    };

    const handlePanelSelect = (item: PanelItem) => {
        router.push(item.path);
    };

    const activePanelItem = useMemo(
        () => panelItems[activeRail].find((item) => item.id === activePanel) ?? panelItems[activeRail][0],
        [activePanel, activeRail]
    );

    const pageTitle = useMemo(() => activePanelItem.title, [activePanelItem]);

    const breadcrumb = useMemo(() => {
        const Icon = activeRail === "drive" ? HardDriveIcon : UsersIcon;
        return { Icon, label: activePanelItem.title };
    }, [activePanelItem, activeRail]);

    const filteredDocuments = useMemo(() => {
        const query = documentSearch.trim().toLowerCase();
        if (!query) return documentRows;

        return documentRows.filter((row) =>
            [
                row.currentLoginDate,
                row.currentLoginTime,
                row.device,
                row.locationCountry,
                row.locationDetail ?? "",
                row.firstLoginDate,
                row.firstLoginTime,
                row.loginType,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [documentSearch]);

    const metrics = useMemo(
        () =>
            activeRail === "drive"
                ? [
                      { title: "Storage usage", value: "132 GB", sub: "of 200 GB", accent: "linear-gradient(135deg,#d7e3ff,#b5c7ff)" },
                      { title: "Active uploads", value: "2 in progress", sub: "8 completed today", accent: "linear-gradient(135deg,#ffe6cf,#ffc8a2)" },
                      { title: "Recent changes", value: "47 edits", sub: "last 24 hours", accent: "linear-gradient(135deg,#e8defc,#d2c3ff)" },
                      { title: "Shared links", value: "18 live", sub: "3 expiring soon", accent: "linear-gradient(135deg,#d1f2ff,#a2e0ff)" },
                  ]
                : [
                      { title: "People records", value: "284", sub: "12 updated this week", accent: "linear-gradient(135deg,#d7e3ff,#b5c7ff)" },
                      { title: "Locations", value: "32", sub: "2 flagged for review", accent: "linear-gradient(135deg,#ffe6cf,#ffc8a2)" },
                      { title: "Teams", value: "9", sub: "3 on-call rotations", accent: "linear-gradient(135deg,#e8defc,#d2c3ff)" },
                      { title: "Feedback", value: "6 open", sub: "2 assigned", accent: "linear-gradient(135deg,#d1f2ff,#a2e0ff)" },
                  ],
        [activeRail]
    );

    return (
        <div className="flex min-h-svh flex-col bg-muted">
            <TopBar />
            <div className="flex flex-1 bg-muted">
                <IconRail activeId={activeRail} onSelect={handleRailSelect} />
                <SidebarPanel items={panelItems[activeRail]} activeId={activePanel} onSelect={handlePanelSelect} />
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-col gap-5 px-6 pb-10 pt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-xl font-semibold text-foreground">{pageTitle}</p>
                                    <span className="h-5 w-px bg-border" aria-hidden="true" />
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        {/* TODO: turn into a link with hover state to navigate back to rail root */}
                                        <breadcrumb.Icon className="h-4 w-4" />
                                        <span aria-hidden="true">-</span>
                                        <span>{breadcrumb.label}</span>
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="hidden items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 sm:flex"
                                >
                                    Open {activeRail}
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                            {pillNavItems[activePanel]?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {pillNavItems[activePanel]?.map((pill) => {
                                        const isActive = activePill === pill.id;
                                        return (
                                            <button
                                                key={pill.id}
                                                type="button"
                                                onClick={() => setActivePill(pill.id)}
                                                className={cn(
                                                    "rounded-full border px-3 py-1.5 text-sm font-semibold transition",
                                                    isActive
                                                        ? "border-foreground bg-foreground text-background shadow-sm"
                                                        : "border-border bg-card text-foreground hover:border-foreground/50 hover:bg-card"
                                                )}
                                            >
                                                {pill.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>

                        {activePanel === "documents" ? (
                            <DocumentsTable
                                searchTerm={documentSearch}
                                onSearchChange={setDocumentSearch}
                                rows={filteredDocuments}
                            />
                        ) : null}

                        {activePanel !== "documents" ? (
                            <>
                                <div className="grid gap-4 lg:grid-cols-3">
                                    <Card className="lg:col-span-2">
                                        <div className="flex flex-col gap-4 p-5">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                        {activeRail === "drive" ? <HardDriveIcon className="h-6 w-6" /> : <UsersIcon className="h-6 w-6" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {activeRail === "drive" ? "Drive workspace" : "Directory records"}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Root access • last synced 2m ago
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                                                        Running
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                                                    >
                                                        Reboot
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
                                                    >
                                                        Manage
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <StatRow label="CPU usage" value="18%" hint="stable, low" icon={Activity} />
                                                <StatRow label="Memory usage" value="32%" hint="2.5 GB / 8 GB" icon={BarChart2} />
                                                <StatRow label="Incoming traffic" value="23.2 MB" hint="last 24h" icon={Upload} />
                                                <StatRow label="Outgoing traffic" value="5.2 MB" hint="last 24h" icon={Cloud} />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-5">
                                        <div className="flex h-full flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">Quick actions</p>
                                                    <p className="text-xs text-muted-foreground">Follow-up tasks for this space</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <button className="flex w-full items-center justify-between rounded-xl border border-border px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-muted" type="button">
                                                    Sync new uploads
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                                <button className="flex w-full items-center justify-between rounded-xl border border-border px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-muted" type="button">
                                                    Review flagged items
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                                <button className="flex w-full items-center justify-between rounded-xl border border-border px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-muted" type="button">
                                                    Share latest bundle
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                    {metrics.map((metric) => (
                                        <MetricCard
                                            key={metric.title}
                                            title={metric.title}
                                            value={metric.value}
                                            sub={metric.sub}
                                            accent={metric.accent}
                                        />
                                    ))}
                                </div>

                                <UpgradeCard />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card className="p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    Access & backups
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Keys, firewall, snapshots in one place.
                                                </p>
                                            </div>
                                            <ListChecks className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="mt-3 grid gap-2">
                                            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-primary" />
                                                    SSH keys
                                                </div>
                                                <span className="text-xs text-muted-foreground">3 active</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-primary" />
                                                    Firewall rules
                                                </div>
                                                <span className="text-xs text-muted-foreground">6 rules</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Cloud className="h-4 w-4 text-primary" />
                                                    Snapshots
                                                </div>
                                                <span className="text-xs text-muted-foreground">Daily</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    Context
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Who owns it, where it runs, plan details.
                                                </p>
                                            </div>
                                            <HardDriveIcon className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="mt-4 grid gap-2 text-sm">
                                            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-3">
                                                <span className="text-muted-foreground">Owner</span>
                                                <span className="font-semibold text-foreground">Content Admin</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-3">
                                                <span className="text-muted-foreground">Region</span>
                                                <span className="font-semibold text-foreground">US-East</span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-3">
                                                <span className="text-muted-foreground">Plan</span>
                                                <span className="font-semibold text-foreground">Sandbox</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

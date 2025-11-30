"use client";

import type { ComponentType } from "react";
import { useMemo, useState } from "react";

import {
    Activity,
    BarChart2,
    ChevronRight,
    Cloud,
    HardDriveIcon,
    ListChecks,
    MapPinIcon,
    MessageSquareIcon,
    Search,
    Share2Icon,
    Shield,
    StarIcon,
    TagIcon,
    Upload,
    UserRound,
    UsersIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type RailItemId = "drive" | "directory";

type RailItem = {
    id: RailItemId;
    label: string;
    icon: ComponentType<{ className?: string }>;
};

type PanelItem = {
    title: string;
    icon: ComponentType<{ className?: string }>;
    status?: string;
};

const railItems: RailItem[] = [
    { id: "drive", label: "Drive", icon: HardDriveIcon },
    { id: "directory", label: "Directory", icon: UsersIcon },
];

const panelItems: Record<RailItemId, PanelItem[]> = {
    drive: [
        { title: "Overview", status: "", icon: HardDriveIcon },
        { title: "Recent", status: "", icon: Activity },
        { title: "Favorites", status: "", icon: StarIcon },
        { title: "Uploads", status: "2", icon: Upload },
        { title: "Sharing", status: "", icon: Share2Icon },
    ],
    directory: [
        { title: "People", status: "284", icon: UsersIcon },
        { title: "Locations", status: "32", icon: MapPinIcon },
        { title: "Teams", status: "9", icon: UserRound },
        { title: "Tags", status: "", icon: TagIcon },
        { title: "Feedback", status: "6", icon: MessageSquareIcon },
    ],
};

function IconRail({
    activeId,
    onSelect,
}: {
    activeId: RailItemId;
    onSelect: (id: RailItemId) => void;
}) {
    return (
        <div className="flex w-[72px] flex-col items-center gap-3 border-r bg-card px-3 py-4">
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

function SidebarPanel({ items }: { items: PanelItem[] }) {
    return (
        <aside className="hidden w-64 border-r bg-card lg:block">
            <div className="space-y-1 px-2 pb-4 pt-4">
                {items.map((item) => (
                    <button
                        key={item.title}
                        type="button"
                        className="flex h-[52px] w-full items-center justify-between rounded-xl px-3 text-left transition hover:bg-muted"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-semibold text-foreground">{item.title}</span>
                        </div>
                        {item.status ? (
                            <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-foreground">
                                {item.status}
                            </span>
                        ) : null}
                    </button>
                ))}
            </div>
        </aside>
    );
}

function TopBar() {
    return (
        <header className="grid grid-cols-[minmax(220px,auto)_1fr_minmax(56px,auto)] items-center gap-4 border-b bg-card px-6 py-3">
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

export default function SandboxPage() {
    const [activeRail, setActiveRail] = useState<RailItemId>("drive");

    const pageTitle = useMemo(() => {
        return activeRail === "drive" ? "Drive overview" : "Directory overview";
    }, [activeRail]);

    const breadcrumb = useMemo(() => {
        return activeRail === "drive" ? "Drive / Overview" : "Directory / Overview";
    }, [activeRail]);

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
            <div className="flex flex-1 overflow-hidden bg-muted">
                <IconRail activeId={activeRail} onSelect={setActiveRail} />
                <SidebarPanel items={panelItems[activeRail]} label={activeRail === "drive" ? "Drive" : "Directory"} />
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-col gap-5 overflow-y-auto px-6 pb-10 pt-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {breadcrumb}
                                <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                                <span className="text-foreground">Sandbox</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-semibold text-foreground">{pageTitle}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Hostinger-inspired shell for the UI migration sandbox.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="hidden items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-sm transition hover:opacity-90 sm:flex"
                                >
                                    Open {activeRail}
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

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
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import {
    ChevronRight,
    ClipboardList,
    CloudIcon,
    FileTextIcon,
    HardDriveIcon,
    IdCardIcon,
    LayersIcon,
    Search,
    StethoscopeIcon,
    UserRound,
    UsersIcon,
    WorkflowIcon,
    Building2Icon,
    HospitalIcon,
    RadiationIcon,
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
        { id: "documents", title: "Documents", path: "/drive/documents", status: "", icon: FileTextIcon },
        { id: "packets", title: "Packets", path: "/drive/packets", status: "", icon: LayersIcon },
        { id: "handouts", title: "Handouts", path: "/drive/handouts", status: "", icon: ClipboardList },
        { id: "automations", title: "Automations", path: "/drive/automations", status: "", icon: WorkflowIcon },
        { id: "public-drive", title: "Public Drive", path: "/drive/public-drive", status: "", icon: CloudIcon },
    ],
    directory: [
        { id: "wcinyp", title: "WCINYP", path: "/directory/wcinyp", status: "", icon: Building2Icon },
        { id: "locations", title: "Locations", path: "/directory/locations", status: "32", icon: HospitalIcon },
        { id: "staff", title: "Staff", path: "/directory/staff", status: "284", icon: UsersIcon },
        { id: "radiologists", title: "Radiologists", path: "/directory/radiologists", status: "", icon: RadiationIcon },
        { id: "providers", title: "Providers", path: "/directory/providers", status: "", icon: StethoscopeIcon },
        { id: "npi-lookup", title: "NPI Lookup", path: "/directory/npi-lookup", status: "", icon: IdCardIcon },
    ],
};

const defaultPanel: Record<RailItemId, PanelItemId> = {
    drive: "documents",
    directory: "wcinyp",
};

const pillNavItems: Partial<Record<PanelItemId, PillNavItem[]>> = {
    documents: [
        { id: "appointment", label: "Appointment" },
        { id: "quick-print", label: "Quick Print" },
        // TODO: Decide why pills have explicit ids; align naming with Drive data if needed.
        { id: "ins-financial", label: "Ins./ Financial" },
        { id: "medical-records", label: "Medical Records" },
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
        <div className="sticky top-16 z-20 hidden h-[calc(100vh-64px)] w-[72px] flex-col items-center gap-3 border-r bg-card px-3 py-4 md:flex">
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

export function AppShell({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { activeRail, activePanel, activePanelItem } = useMemo(() => {
        const parts = (pathname ?? "").split("/").filter(Boolean);
        const railSegment = parts[0];
        const slug = parts[1];
        const nextRail: RailItemId = railSegment === "directory" ? "directory" : "drive";
        const panelMatch = panelItems[nextRail].find((item) => item.id === slug);
        const resolvedPanel = panelMatch ?? panelItems[nextRail].find((item) => item.id === defaultPanel[nextRail]) ?? panelItems[nextRail][0];

        return {
            activeRail: nextRail,
            activePanel: resolvedPanel.id,
            activePanelItem: resolvedPanel,
        };
    }, [pathname]);

    const pills = pillNavItems[activePanel];
    const [activePill, setActivePill] = useState<string | null>(null);

    useEffect(() => {
        const nextDefault = pills?.[0]?.id ?? null;
        setActivePill(nextDefault);
    }, [pills]);

    const handleRailSelect = (id: RailItemId) => {
        const target = panelItems[id][0];
        if (target) {
            router.push(target.path);
        }
    };

    const handlePanelSelect = (item: PanelItem) => {
        router.push(item.path);
    };

    const pageTitle = activePanelItem?.title ?? "Workspace";

    return (
        <div className="flex min-h-svh flex-col bg-muted">
            <TopBar />
            <div className="flex flex-1 bg-muted">
                <IconRail activeId={activeRail} onSelect={handleRailSelect} />
                <SidebarPanel items={panelItems[activeRail]} activeId={activePanel} onSelect={handlePanelSelect} />
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-1 flex-col gap-5 px-6 pb-10 pt-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-xl font-semibold text-foreground">{pageTitle}</p>
                                {pills?.length ? <span className="h-5 w-px bg-border" aria-hidden="true" /> : null}
                                {pills?.length ? (
                                    <div className="flex flex-wrap items-center gap-2">
                                        {pills.map((pill) => {
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
                            {/* Primary header action removed per design; keep space available for future context actions. */}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export type { PanelItemId, RailItemId };

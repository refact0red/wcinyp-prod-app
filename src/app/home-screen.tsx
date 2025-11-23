"use client";

import type { ComponentType } from "react";
import { usePathname } from "next/navigation";
import {
    Archive,
    BarChartSquare02,
    BookOpen01,
    Check,
    CheckDone01,
    Copy01,
    Cube01,
    CurrencyDollarCircle,
    Grid03,
    HelpCircle,
    HomeLine,
    LineChartUp03,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings01,
    Star01,
    User01,
    Users01,
    UsersPlus,
} from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useClipboard } from "@/hooks/use-clipboard";

type HighlightStat = {
    label: string;
    value: string;
    helper: string;
    icon?: ComponentType<{ className?: string }>;
};

const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

const footerItems: NavItemType[] = [
    {
        label: "Settings",
        href: "/settings",
        icon: Settings01,
    },
];

const highlightStats: HighlightStat[] = [
    { label: "Active projects", value: "24", helper: "6 in review this week", icon: Rows01 },
    { label: "New orders", value: "182", helper: "Today", icon: Package },
    { label: "Revenue", value: "$128k", helper: "This quarter", icon: CurrencyDollarCircle },
    { label: "Customers", value: "1,204", helper: "↑ 12% vs last month", icon: Users01 },
    { label: "Completion rate", value: "86%", helper: "Sprint health", icon: CheckDone01 },
    { label: "Open reports", value: "18", helper: "Updated daily", icon: BarChartSquare02 },
];

export const HomeScreen = () => {
    const clipboard = useClipboard();
    const pathname = usePathname();

    const renderCommandRow = (title: string, command: string, id: string) => (
        <div key={id} className="flex flex-col gap-2 rounded-xl border border-secondary bg-secondary/50 px-4 py-3 shadow-xs">
            <div className="text-sm font-semibold text-primary">{title}</div>
            <div className="flex items-center gap-2">
                <code className="flex-1 overflow-auto whitespace-nowrap font-mono text-sm text-secondary">{command}</code>
                <ButtonUtility
                    color="secondary"
                    size="sm"
                    tooltip={clipboard.copied === id ? "Copied" : "Copy command"}
                    icon={clipboard.copied === id ? Check : Copy01}
                    onClick={() => clipboard.copy(command, id)}
                />
            </div>
        </div>
    );

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSimple
                activeUrl={pathname}
                items={navItemsSimple}
                footerItems={footerItems}
            />

            <main className="flex-1">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-brand-secondary">Product admin</p>
                            <h1 className="text-display-xs font-semibold text-primary">Welcome to your Untitled UI kit</h1>
                            <p className="text-md text-tertiary">Use the sidebar to jump between product areas and keep building quickly.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button color="secondary" size="sm" iconLeading={UsersPlus}>
                                Invite teammates
                            </Button>
                            <Button size="sm" iconLeading={CheckDone01}>
                                New task
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {highlightStats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="flex flex-col gap-3 rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
                                    <div className="flex items-center gap-3">
                                        {Icon && (
                                            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-fg-quaternary">
                                                <Icon className="size-5" />
                                            </div>
                                        )}
                                        <p className="text-sm font-semibold text-secondary">{stat.label}</p>
                                    </div>
                                    <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                                    <p className="text-sm text-tertiary">{stat.helper}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-xs">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-primary">Add more components</h2>
                                <p className="mt-1 text-sm text-tertiary">
                                    Pull any layout from the Untitled UI CLI without leaving your editor.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    href="https://www.untitledui.com/react/docs/introduction"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="link-color"
                                    size="sm"
                                    iconLeading={BookOpen01}
                                >
                                    Docs
                                </Button>
                                <Button
                                    href="https://www.untitledui.com/react/resources/icons"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="link-color"
                                    size="sm"
                                    iconLeading={Cube01}
                                >
                                    Icons
                                </Button>
                                <Button
                                    href="https://github.com/untitleduico/react/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="link-color"
                                    size="sm"
                                    iconLeading={HelpCircle}
                                >
                                    Help
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {renderCommandRow("Use the sidebar template", "npx untitledui@latest add sidebar-navigation-base", "sidebar-command")}
                            {renderCommandRow("Browse the component catalog", "npx untitledui@latest add", "catalog-command")}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

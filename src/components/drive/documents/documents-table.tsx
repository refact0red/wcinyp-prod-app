"use client";

import type { ChangeEvent } from "react";

import { ChevronRight, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export type DocumentRow = {
    currentLoginDate: string;
    currentLoginTime: string;
    device: string;
    locationCountry: string;
    locationDetail?: string;
    firstLoginDate: string;
    firstLoginTime: string;
    loginType: string;
};

export function DocumentsTable({
    searchTerm,
    onSearchChange,
    rows,
    className,
}: {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    rows: DocumentRow[];
    className?: string;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <Card className={cn("h-full overflow-hidden", className)}>
            <div className="border-b border-border bg-card px-5 py-4">
                <div className="flex w-full justify-center">
                    <div className="relative w-full max-w-2xl">
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

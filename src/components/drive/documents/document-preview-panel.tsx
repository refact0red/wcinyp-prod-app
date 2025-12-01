"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const pills = [
    { id: "preview", label: "Preview" },
    { id: "print-queue", label: "Print Queue" },
];

export function DocumentPreviewPanel({
    activeTab,
    onTabChange,
    className,
}: {
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}) {
    return (
        <Card className={cn("flex h-full flex-col", className)}>
            <div className="flex min-h-[84px] items-center justify-center border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                    {pills.map((pill) => {
                        const isActive = pill.id === activeTab;
                        return (
                            <button
                                key={pill.id}
                                type="button"
                                onClick={() => onTabChange(pill.id)}
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
            </div>
            <div className="flex flex-1 items-center justify-center px-4 py-6 text-sm text-muted-foreground">
                Preview panel placeholder
            </div>
        </Card>
    );
}

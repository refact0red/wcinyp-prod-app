import type { Metadata } from "next";

import { LabShell } from "@/components/shadcn/lab-shell";

export const metadata: Metadata = {
    title: "Timesheet",
};

export default function TimesheetPage() {
    return (
        <LabShell title="Timesheet">
            <div className="flex flex-1 flex-col">
                <div className="container @container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-1 flex-col py-4 md:py-6">
                        <div className="max-w-2xl space-y-3">
                            <h1 className="text-2xl font-semibold tracking-tight">Timesheet</h1>
                            <p className="text-sm text-muted-foreground">
                                This will become the official workspace for tracking and reviewing SPC time across sites.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LabShell>
    );
}


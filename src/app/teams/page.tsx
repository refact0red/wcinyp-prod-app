import type { Metadata } from "next";

import { LabShell } from "@/components/shadcn/lab-shell";

export const metadata: Metadata = {
    title: "Teams",
};

export default function TeamsPage() {
    return (
        <LabShell title="Teams">
            <div className="flex flex-1 flex-col">
                <div className="container @container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-1 flex-col py-4 md:py-6">
                        <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
                    </div>
                </div>
            </div>
        </LabShell>
    );
}

import type { Metadata } from "next";

import { LabShell } from "@/components/shadcn/lab-shell";

export const metadata: Metadata = {
    title: "3D Models (Experimental)",
};

export default function Experimental3dModelsPage() {
    return (
        <LabShell title="3D Models (Experimental)">
            <div className="flex flex-1 flex-col">
                <div className="container @container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-1 flex-col py-4 md:py-6">
                        <div className="max-w-2xl space-y-3">
                            <h1 className="text-2xl font-semibold tracking-tight">3D Models</h1>
                            <p className="text-sm text-muted-foreground">
                                Early exploration of how 3D models could help coordinators explain studies, prep
                                patients, or understand scheduling constraints.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </LabShell>
    );
}


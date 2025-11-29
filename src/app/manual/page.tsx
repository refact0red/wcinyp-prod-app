import type { Metadata } from "next";
import { LabShell } from "@/components/shadcn/lab-shell";
import { SiteSubHeader } from "@/components/shadcn/site-subheader";

export const metadata: Metadata = {
    title: "Manual",
};

export default function ManualPage() {
    return (
        <LabShell
            title="Manual"
            ribbon={
                <SiteSubHeader
                    items={[
                        { label: "WCINYP", current: true },
                        { label: "BKM" },
                        { label: "STARR" },
                        { label: "LIC" },
                        { label: "BWY" },
                        { label: "DHK" },
                        { label: "E55TH" },
                        { label: "E61ST" },
                        { label: "SPIRAL" },
                        { label: "WGC" },
                    ]}
                />
            }
        >
            <div className="flex flex-1 flex-col">
                <div className="container @container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-1 flex-col py-4 md:py-6" />
                </div>
            </div>
        </LabShell>
    );
}

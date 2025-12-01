"use client";

import { useState } from "react";

import { DocumentPreviewPanel } from "./document-preview-panel";
import { DocumentsTable } from "./documents-table";
import type { DocumentRow } from "./columns";

const documentRows: DocumentRow[] = [
    {
        id: "row-1",
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
        id: "row-2",
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
        id: "row-3",
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

export function DocumentsPage() {
    const [previewTab, setPreviewTab] = useState("preview");

    return (
        <div className="grid flex-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <DocumentsTable data={documentRows} />
            <DocumentPreviewPanel activeTab={previewTab} onTabChange={setPreviewTab} />
        </div>
    );
}

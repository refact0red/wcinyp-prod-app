import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Lab Dashboard",
    description: "Shadcn dashboard app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark dark-mode">
            <body className="bg-background text-foreground">{children}</body>
        </html>
    );
}

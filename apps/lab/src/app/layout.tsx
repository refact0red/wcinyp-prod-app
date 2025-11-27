import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Lab Dashboard",
    description: "Shadcn dashboard app",
    icons: {
        icon: [
            { url: "/icon.png?v=3" },
            { url: "/favicon.ico?v=3" },
        ],
        shortcut: "/favicon.ico?v=3",
        apple: "/icon.png?v=3",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark dark-mode">
            <body className="bg-background text-foreground">{children}</body>
        </html>
    );
}

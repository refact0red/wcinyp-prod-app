import "../styles/globals.css";
import "../styles/overscroll.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";

import { HistoryProvider } from "@/components/history-context";
import { ThemeProvider } from "@/components/shadcn/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "WCINYP",
    template: "WCINYP / %s",
  },
  description: "WCINYP labs dashboard",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#7f56d9",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <Suspense fallback={null}>
            <HistoryProvider>{children}</HistoryProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

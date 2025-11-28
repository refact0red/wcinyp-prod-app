import "../styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";

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
      { url: "/icon.png?v=3" },
      { url: "/favicon.ico?v=3" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/icon.png?v=3",
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
          <HistoryProvider>{children}</HistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

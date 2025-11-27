import "../styles/globals.css"

import type { Metadata, Viewport } from "next"
import React from "react"

import { ThemeProvider } from "@/components/shadcn/theme-provider"

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
}

export const viewport: Viewport = {
  themeColor: "#7f56d9",
  colorScheme: "light dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

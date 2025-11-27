"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/shadcn/ui/button"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  const Icon = isDark ? SunIcon : MoonIcon
  const label = isDark ? "Switch to light mode" : "Switch to dark mode"

  return (
    <Button
      size="icon"
      className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
      variant="outline"
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!isMounted}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </Button>
  )
}


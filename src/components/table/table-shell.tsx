import * as React from "react"

import { cn } from "@/lib/utils"

type TableShellProps = React.HTMLAttributes<HTMLDivElement> & {
  withBorder?: boolean
  stickyHeader?: boolean
  scrollable?: boolean
}

export function TableShell({
  className,
  children,
  withBorder = true,
  stickyHeader = true,
  scrollable = false,
  ...props
}: TableShellProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg",
        scrollable ? "overflow-auto" : "overflow-hidden",
        stickyHeader && "[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10",
        withBorder ? "border" : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

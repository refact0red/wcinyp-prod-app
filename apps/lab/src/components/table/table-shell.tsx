import * as React from "react"

import { cn } from "@/lib/utils"

type TableShellProps = React.HTMLAttributes<HTMLDivElement> & {
  withBorder?: boolean
  stickyHeader?: boolean
}

export function TableShell({
  className,
  children,
  withBorder = true,
  stickyHeader = true,
  ...props
}: TableShellProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg",
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

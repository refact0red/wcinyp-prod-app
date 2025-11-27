import * as React from "react"
import { InboxIcon } from "lucide-react"

import { Button } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title = "No results",
  description = "Try adjusting your filters or search.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-10 text-center text-muted-foreground",
        className
      )}
    >
      <InboxIcon className="mb-1 size-8" />
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}

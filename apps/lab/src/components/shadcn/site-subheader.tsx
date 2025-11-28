"use client";

import type * as React from "react";
import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";

type SiteSubHeaderItem = {
  label: string;
  href?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: React.ReactNode;
  current?: boolean;
};

type SiteSubHeaderProps = {
  items: SiteSubHeaderItem[];
  trailingContent?: React.ReactNode;
};

export function SiteSubHeader({ items, trailingContent }: SiteSubHeaderProps) {
  if (!items.length && !trailingContent) return null;

  return (
    <div className="flex h-11 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <div className="flex w-full items-center justify-between gap-2">
        {items.length ? (
          <nav aria-label="Section navigation" className="flex items-center gap-1">
            {items.map((item) => {
              const content = (
                <Button
                  variant={item.current ? "outline" : "ghost"}
                  size="sm"
                  className={item.current ? "bg-background" : undefined}
                >
                  {item.icon ? (
                    <item.icon className="mr-1.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  ) : null}
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge ? <span className="ml-1.5">{item.badge}</span> : null}
                </Button>
              );

              if (item.href) {
                return (
                  <Link key={item.label} href={item.href} className="inline-flex">
                    {content}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="inline-flex">
                  {content}
                </div>
              );
            })}
          </nav>
        ) : (
          <div />
        )}
        {trailingContent ? <div className="flex items-center gap-2">{trailingContent}</div> : null}
      </div>
    </div>
  );
}

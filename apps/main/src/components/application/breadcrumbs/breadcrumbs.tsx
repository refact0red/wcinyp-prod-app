"use client";

import type { ReactElement, ReactNode } from "react";
import { Children } from "react";
import { cx } from "@/utils/cx";

type BreadcrumbDivider = "greater" | "slash";

interface BreadcrumbsProps {
    /** Divider style between items. */
    divider?: BreadcrumbDivider;
    /** Items are rendered as buttons by default. */
    type?: "button";
    /** Additional classes for the wrapper. */
    className?: string;
    children: ReactNode;
}

interface BreadcrumbsItemProps {
    /** Destination URL. */
    href?: string;
    /** Content for the breadcrumb. */
    children: ReactNode;
    /** Additional classes. */
    className?: string;
    /** Whether this is the current page. */
    current?: boolean;
}

export const Breadcrumbs = ({ divider = "greater", type = "button", className, children }: BreadcrumbsProps) => {
    const items = Children.toArray(children).filter(Boolean) as ReactElement[];

    return (
        <nav aria-label="Breadcrumb" className={cx("flex items-center", className)}>
            <ol className="flex items-center gap-2 text-sm text-tertiary">
                {items.map((child, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={child.key ?? index} className="flex items-center gap-2">
                            {child}
                            {!isLast && <DividerIcon divider={divider} />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

const DividerIcon = ({ divider }: { divider: BreadcrumbDivider }) => {
    if (divider === "slash") {
        return <span aria-hidden className="text-secondary">/</span>;
    }
    return <span aria-hidden className="text-secondary">&gt;</span>;
};

const BreadcrumbsItem = ({ href = "#", children, className, current }: BreadcrumbsItemProps) => {
    return (
        <button
            type="button"
            aria-current={current ? "page" : undefined}
            onClick={() => {
                if (typeof window !== "undefined") {
                    window.location.assign(href);
                }
            }}
            className={cx(
                "truncate rounded-md px-2 py-1 text-left text-sm font-semibold text-secondary outline-focus-ring hover:bg-primary_hover hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                current && "text-primary",
                className,
            )}
        >
            {children}
        </button>
    );
};

Breadcrumbs.Item = BreadcrumbsItem;

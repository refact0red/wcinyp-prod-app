"use client";

import type { ReactNode } from "react";
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
    return (
        <nav aria-label="Breadcrumb" className={cx("flex items-center", className)}>
            <ol className="flex items-center gap-2 text-sm text-tertiary">{children}</ol>
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
        <li className="flex items-center gap-2">
            <button
                type="button"
                aria-current={current ? "page" : undefined}
                onClick={() => {
                    if (typeof window !== "undefined") {
                        window.location.assign(href);
                    }
                }}
                className={cx(
                    "truncate bg-transparent p-0 text-left text-sm font-semibold text-secondary outline-focus-ring hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
                    current && "text-primary",
                    className,
                )}
            >
                {children}
            </button>
            <DividerIcon divider="greater" />
        </li>
    );
};

Breadcrumbs.Item = BreadcrumbsItem;

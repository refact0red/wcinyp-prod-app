"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

const SectionHeaderRoot = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return <div {...props} className={cx("flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-4 shadow-xs md:p-6", className)} />;
};

const SectionHeaderGroup = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return <div {...props} className={cx("flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6", className)} />;
};

const SectionHeaderHeading = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    return <h1 {...props} className={cx("text-display-xs font-semibold text-primary", className)} />;
};

const SectionHeaderSubheading = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
    return <p {...props} className={cx("text-md text-tertiary", className)} />;
};

export const SectionHeader = {
    Root: SectionHeaderRoot,
    Group: SectionHeaderGroup,
    Heading: SectionHeaderHeading,
    Subheading: SectionHeaderSubheading,
};

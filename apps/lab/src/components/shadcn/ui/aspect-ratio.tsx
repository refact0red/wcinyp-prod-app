"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
    ratio?: number;
};

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
    ({ ratio = 16 / 9, className, style, children, ...props }, ref) => {
        const paddingBottom = `${100 / ratio}%`;

        return (
            <div
                ref={ref}
                className={cn("relative w-full overflow-hidden", className)}
                style={style}
                {...props}
            >
                <div style={{ paddingBottom }} />
                <div className="absolute inset-0">{children}</div>
            </div>
        );
    },
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };


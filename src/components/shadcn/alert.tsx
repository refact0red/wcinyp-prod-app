import * as React from "react";
import type { ComponentType, SVGProps } from "react";
import { AlertTriangle, InfoCircle, MessageAlertCircle } from "@untitledui/icons";

import { cx } from "@/utils/cx";

const variants = {
    default: "bg-primary text-secondary ring-1 ring-primary",
    destructive: "bg-error-solid/[0.06] text-error-primary ring-1 ring-error_subtle",
    muted: "bg-primary text-tertiary ring-1 ring-primary",
};

const defaultIcons: Record<keyof typeof variants, ComponentType<SVGProps<SVGSVGElement>> | undefined> = {
    default: InfoCircle,
    destructive: AlertTriangle,
    muted: MessageAlertCircle,
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: keyof typeof variants;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export function Alert({ className, children, variant = "default", icon: Icon, ...props }: AlertProps) {
    const IconToRender = Icon ?? defaultIcons[variant];

    return (
        <div role="status" className={cx("relative flex gap-3 rounded-lg p-4", variants[variant], className)} {...props}>
            {IconToRender ? <IconToRender className={cx("mt-0.5 size-5 shrink-0", variant === "muted" ? "text-tertiary" : "text-current")} /> : null}
            <div className="space-y-1">{children}</div>
        </div>
    );
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cx("text-sm font-semibold leading-5 text-secondary", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cx("text-sm text-tertiary", className)} {...props} />;
}

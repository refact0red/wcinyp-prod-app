import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, Check, Mail01, SearchLg, Settings01, User01 } from "@untitledui/icons";

import { cx } from "@/utils/cx";

type IconStoryProps = {
    size: number;
    tone: "neutral" | "brand" | "success" | "warning";
};

const icons = [
    { name: "SearchLg", Icon: SearchLg },
    { name: "User01", Icon: User01 },
    { name: "Mail01", Icon: Mail01 },
    { name: "Settings01", Icon: Settings01 },
    { name: "Check", Icon: Check },
    { name: "AlertTriangle", Icon: AlertTriangle },
];

const toneClasses: Record<IconStoryProps["tone"], string> = {
    neutral: "text-fg-quaternary",
    brand: "text-brand",
    success: "text-success",
    warning: "text-warning",
};

const meta = {
    title: "Untitled UI/Icons",
    tags: ["autodocs"],
    args: {
        size: 24,
        tone: "neutral",
    },
    argTypes: {
        size: { control: { type: "number", min: 12, max: 64, step: 2 } },
        tone: { control: "select", options: Object.keys(toneClasses) },
    },
} satisfies Meta<IconStoryProps>;

type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
    render: ({ size, tone }) => (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {icons.map(({ name, Icon }) => (
                <div key={name} className="flex items-center gap-3 rounded-lg border border-primary bg-primary p-3 shadow-xs">
                    <Icon className={cx("shrink-0 transition-colors", toneClasses[tone])} style={{ width: size, height: size }} aria-hidden />
                    <span className="text-sm font-medium text-secondary">{name}</span>
                </div>
            ))}
        </div>
    ),
};

export default meta;

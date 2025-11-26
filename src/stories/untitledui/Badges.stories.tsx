import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CheckVerified01, Mail01 } from "@untitledui/icons";

import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";

const meta = {
    title: "Untitled UI/Badges",
    tags: ["autodocs"],
    parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Colors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <Badge color="gray">Directory</Badge>
            <Badge color="brand">WCINYP</Badge>
            <Badge color="success">Synced</Badge>
            <Badge color="warning">Pending</Badge>
            <Badge color="error">Failed</Badge>
        </div>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <BadgeWithIcon color="brand" iconLeading={Mail01}>
                Email sent
            </BadgeWithIcon>
            <BadgeWithIcon color="success" iconLeading={CheckVerified01}>
                Verified
            </BadgeWithIcon>
            <BadgeWithIcon color="error" iconLeading={AlertTriangle} iconTrailing={AlertTriangle}>
                Attention
            </BadgeWithIcon>
        </div>
    ),
};

export const ModernPills: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <BadgeWithDot type="badge-modern" color="gray">
                Directory
            </BadgeWithDot>
            <BadgeWithDot type="badge-modern" color="brand">
                Providers
            </BadgeWithDot>
            <BadgeWithDot type="badge-modern" color="success">
                Cleared
            </BadgeWithDot>
        </div>
    ),
};

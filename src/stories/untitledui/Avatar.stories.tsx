import type { Meta, StoryObj } from "@storybook/react";
import { Building07, User01 } from "@untitledui/icons";

import { Avatar } from "@/components/base/avatar/avatar";

const meta = {
    title: "Untitled UI/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    args: {
        size: "md",
        src: "https://i.pravatar.cc/150?img=15",
        alt: "WCINYP admin",
    },
    argTypes: {
        size: { control: "select", options: ["xxs", "xs", "sm", "md", "lg", "xl", "2xl"] },
        status: { control: "select", options: ["online", "offline", undefined] },
        badge: { control: false },
    },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStatusAndVerified: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Avatar size="sm" src="https://i.pravatar.cc/150?img=47" status="online" />
            <Avatar size="md" src="https://i.pravatar.cc/150?img=33" status="offline" verified />
            <Avatar size="lg" initials="WC" status="online" />
            <Avatar size="xl" placeholderIcon={User01} verified />
        </div>
    ),
};

export const WithBadges: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Avatar size="md" src="https://i.pravatar.cc/150?img=12" badge={<Building07 className="size-4 text-brand" />} />
            <Avatar size="lg" initials="IT" badge={<span className="rounded-md bg-primary px-2 py-1 text-xs font-semibold text-brand">IT</span>} />
            <Avatar size="md" placeholderIcon={User01} badge={<span className="rounded-full bg-brand-solid px-2 py-0.5 text-xs text-white">Admin</span>} />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-wrap items-end gap-3">
            {(["xxs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <Avatar size={size} initials="WC" />
                    <span className="text-xs text-tertiary uppercase">{size}</span>
                </div>
            ))}
        </div>
    ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Mail01, SearchLg } from "@untitledui/icons";

import { Input } from "@/components/base/input/input";

const meta = {
    title: "Untitled UI/Input",
    component: Input,
    tags: ["autodocs"],
    args: {
        label: "Email address",
        placeholder: "you@example.com",
        hint: "We’ll use this to notify WCINYP admins.",
        size: "md",
    },
    argTypes: {
        size: {
            control: "inline-radio",
            options: ["sm", "md"],
        },
        icon: { control: false },
        tooltip: { control: "text" },
        shortcut: { control: "text" },
    },
    parameters: {
        controls: { expanded: true },
    },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLeadingIcon: Story = {
    args: {
        label: "Search people",
        placeholder: "Search by name or team",
        icon: SearchLg,
    },
};

export const WithShortcut: Story = {
    args: {
        label: "Quick search",
        placeholder: "Jump to a person or tag",
        shortcut: "⌘K",
        icon: SearchLg,
    },
};

export const WithTooltip: Story = {
    args: {
        label: "Work email",
        placeholder: "you@example.com",
        tooltip: "We’ll send WCINYP admin updates here.",
        icon: Mail01,
    },
};

export const Invalid: Story = {
    args: {
        isInvalid: true,
        hint: "An email is required for notifications.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled input",
        hint: "This field can’t be edited.",
        isDisabled: true,
        placeholder: "Input disabled",
    },
};

export default meta;

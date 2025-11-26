import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, ArrowRight, Check, Plus, User01 } from "@untitledui/icons";

import { Button, type Props as ButtonProps, styles } from "@/components/base/buttons/button";

const meta = {
    title: "Untitled UI/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        children: "Primary button",
        color: "primary",
        size: "md",
    },
    argTypes: {
        color: {
            control: "select",
            options: Object.keys(styles.colors),
        },
        size: {
            control: "select",
            options: Object.keys(styles.sizes),
        },
        iconLeading: { control: false },
        iconTrailing: { control: false },
        href: { control: "text" },
    },
    parameters: {
        controls: { expanded: true },
    },
} satisfies Meta<ButtonProps>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithTrailingIcon: Story = {
    args: {
        children: "Next step",
        iconTrailing: ArrowRight,
    },
};

export const WithLeadingIcon: Story = {
    args: {
        children: "Assign owner",
        iconLeading: User01,
        color: "secondary",
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete record",
        color: "primary-destructive",
        iconLeading: AlertTriangle,
        isDisabled: false,
    },
};

export const IconOnly: Story = {
    args: {
        iconLeading: Plus,
        color: "secondary",
        "aria-label": "Add item",
    },
};

export const Loading: Story = {
    args: {
        children: "Saving...",
        isLoading: true,
    },
};

export const Link: Story = {
    args: {
        children: "View documentation",
        color: "link-color",
        href: "https://www.untitledui.com/react",
        target: "_blank",
        rel: "noreferrer",
    },
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react";
import { InfoCircle } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Tooltip } from "@/components/base/tooltip/tooltip";

const meta = {
    title: "Untitled UI/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    args: {
        title: "WCINYP context",
        description: "Tooltips help administrators quickly understand controls without leaving the flow.",
        placement: "top",
        arrow: true,
    },
    argTypes: {
        trigger: { control: "select", options: ["focus", "hover", "press", "longPress"] },
        placement: {
            control: "select",
            options: ["top", "bottom", "left", "right", "top start", "top end", "bottom start", "bottom end"],
        },
    },
    render: (args) => (
        <Tooltip {...args}>
            <Button size="sm" color="secondary" iconLeading={InfoCircle}>
                Hover me
            </Button>
        </Tooltip>
    ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InlineLink: Story = {
    args: {
        title: "Secure sharing",
        description: "Only WCINYP admins with permissions can see this directory.",
        placement: "bottom",
    },
    render: (args) => (
        <p className="max-w-xl text-secondary">
            Directory sync is protected.{" "}
            <Tooltip {...args}>
                <button className="underline decoration-dotted underline-offset-4">Learn more</button>
            </Tooltip>
        </p>
    ),
};

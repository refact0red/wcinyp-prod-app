import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar, ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { ProgressBarCircle, ProgressBarHalfCircle } from "@/components/base/progress-indicators/progress-circles";

const meta = {
    title: "Untitled UI/Progress",
    tags: ["autodocs"],
    args: {
        value: 42,
    },
    argTypes: {
        value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    },
} satisfies Meta<{ value: number }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Linear: Story = {
    render: ({ value }) => (
        <div className="flex max-w-xl flex-col gap-4">
            <ProgressBar value={value} labelPosition="right" />
            <ProgressBar value={value} labelPosition="bottom" />
            <ProgressBar value={value} labelPosition="top-floating" />
            <ProgressBar value={value} labelPosition="bottom-floating" />
            <ProgressBarBase value={value} className="h-3" />
        </div>
    ),
};

export const Steps: Story = {
    args: { value: 2 },
    render: ({ value }) => (
        <div className="flex flex-wrap gap-6">
            <ProgressBarCircle size="xs" value={value * 25} label="Progress" />
            <ProgressBarCircle size="sm" value={value * 25} label="Training" />
            <ProgressBarHalfCircle size="xs" value={value * 25} label="Upload" />
        </div>
    ),
};

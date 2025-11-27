import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@/components/base/slider/slider";

const meta = {
    title: "Untitled UI/Slider",
    component: Slider,
    tags: ["autodocs"],
    args: {
        label: "Team size",
        defaultValue: [24],
        minValue: 0,
        maxValue: 60,
        step: 5,
    },
    argTypes: {
        defaultValue: { control: false },
        value: { control: false },
    },
    render: (args) => (
        <div className="max-w-lg">
            <Slider {...args} />
        </div>
    ),
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
    args: {
        label: "Coverage window",
        defaultValue: [9, 17],
        minValue: 0,
        maxValue: 24,
        step: 1,
        formatOptions: { style: "unit", unit: "hour" },
    },
};

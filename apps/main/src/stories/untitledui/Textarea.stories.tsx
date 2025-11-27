import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "@/components/base/textarea/textarea";

const meta = {
    title: "Untitled UI/Textarea",
    component: TextArea,
    tags: ["autodocs"],
    args: {
        label: "Notes",
        placeholder: "Capture context for WCINYP admins…",
        hint: "Visible to admin staff only.",
        size: "md",
        minRows: 3,
    },
    argTypes: {
        size: { control: "inline-radio", options: ["sm", "md"] },
    },
    render: (args) => (
        <div className="max-w-lg">
            <TextArea {...args} />
        </div>
    ),
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        label: "Read-only notes",
        defaultValue: "Only platform engineering can edit this block.",
        isDisabled: true,
    },
};

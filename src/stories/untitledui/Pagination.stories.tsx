import type { Meta, StoryObj } from "@storybook/react";

import { PaginationPageDefault, PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";

const meta = {
    title: "Untitled UI/Pagination",
    tags: ["autodocs"],
    args: {
        page: 3,
        total: 12,
    },
    argTypes: {
        page: { control: { type: "number", min: 1, max: 20, step: 1 } },
        total: { control: { type: "number", min: 1, max: 50, step: 1 } },
    },
} satisfies Meta<{ page: number; total: number }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ page, total }) => <PaginationPageDefault page={page} total={total} />,
};

export const MinimalCentered: Story = {
    render: ({ page, total }) => <PaginationPageMinimalCenter page={page} total={total} />,
};

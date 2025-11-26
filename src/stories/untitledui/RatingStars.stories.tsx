import type { Meta, StoryObj } from "@storybook/react";

import { RatingStars } from "@/components/foundations/rating-stars";

const meta = {
    title: "Untitled UI/Rating Stars",
    component: RatingStars,
    tags: ["autodocs"],
    args: {
        rating: 4.2,
        stars: 5,
    },
    argTypes: {
        rating: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
        stars: { control: { type: "number", min: 1, max: 10, step: 1 } },
    },
} satisfies Meta<typeof RatingStars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HalfStars: Story = {
    args: { rating: 3.5 },
};

export const Dense: Story = {
    args: { rating: 7.5, stars: 10 },
};

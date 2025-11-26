import type { Meta, StoryObj } from "@storybook/react";

import NotFound from "@/app/not-found";
import { setMockPathname } from "../../../.storybook/next-navigation.mock";

const meta = {
    title: "Pages/Not Found",
    component: NotFound,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => {
            setMockPathname("/not-found");
            return <Story />;
        },
    ],
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

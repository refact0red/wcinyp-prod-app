import type { Meta, StoryObj } from "@storybook/react";

import { DirectoryScreen } from "@/app/directory/directory-screen";
import { setMockPathname } from "../../../.storybook/next-navigation.mock";

const meta = {
    title: "Pages/Directory",
    component: DirectoryScreen,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => {
            setMockPathname("/directory");
            return <Story />;
        },
    ],
} satisfies Meta<typeof DirectoryScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

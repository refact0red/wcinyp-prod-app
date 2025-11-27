import type { Meta, StoryObj } from "@storybook/react";

import { PublicDriveScreen } from "@/app/documents/documents-screen";
import { setMockPathname } from "../../../.storybook/next-navigation.mock";

const meta = {
    title: "Pages/Documents",
    component: PublicDriveScreen,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => {
            setMockPathname("/documents");
            return <Story />;
        },
    ],
} satisfies Meta<typeof PublicDriveScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

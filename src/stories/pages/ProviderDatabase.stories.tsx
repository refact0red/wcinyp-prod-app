import type { Meta, StoryObj } from "@storybook/react";

import { ProviderDatabaseScreen } from "@/app/provider-database/provider-database-screen";
import { setMockPathname } from "../../../.storybook/next-navigation.mock";

const meta = {
    title: "Pages/Provider Database",
    component: ProviderDatabaseScreen,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => {
            setMockPathname("/provider-database");
            return <Story />;
        },
    ],
} satisfies Meta<typeof ProviderDatabaseScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

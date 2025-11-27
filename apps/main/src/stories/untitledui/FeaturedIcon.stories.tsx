import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, Mail01, SearchLg, Zap } from "@untitledui/icons";

import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const meta = {
    title: "Untitled UI/Featured Icon",
    component: FeaturedIcon,
    tags: ["autodocs"],
    args: {
        icon: SearchLg,
        color: "gray",
        theme: "modern",
        size: "lg",
    },
    argTypes: {
        color: { control: "select", options: ["brand", "gray", "error", "warning", "success"] },
        theme: { control: "select", options: ["light", "gradient", "dark", "modern", "modern-neue", "outline"] },
        size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
    render: () => (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            <FeaturedIcon theme="light" color="brand" size="lg" icon={Mail01} />
            <FeaturedIcon theme="gradient" color="success" size="md" icon={Zap} />
            <FeaturedIcon theme="dark" color="warning" size="md" icon={AlertTriangle} />
            <FeaturedIcon theme="outline" color="gray" size="lg" icon={SearchLg} />
        </div>
    ),
};

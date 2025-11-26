import type { Meta, StoryObj } from "@storybook/react";
import { ClockFastForward, Mail01 } from "@untitledui/icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";

type AlertStoryProps = {
    title: string;
    description: string;
    variant: "default" | "destructive" | "muted";
};

const meta = {
    title: "Shadcn/Alert",
    component: Alert,
    tags: ["autodocs"],
    args: {
        title: "System notice",
        description: "Stories render in isolation, so WCINYP admins can review states without navigating the app.",
        variant: "default",
    },
    argTypes: {
        variant: {
            control: "inline-radio",
            options: ["default", "destructive", "muted"],
        },
    },
} satisfies Meta<AlertStoryProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ title, description, variant }) => (
        <Alert variant={variant}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    ),
};

export const Destructive: Story = {
    args: {
        title: "Provisioning failed",
        description: "We couldn’t sync new WCINYP staff. Re-run sync or contact platform engineering.",
        variant: "destructive",
    },
};

export const MutedWithIcon: Story = {
    args: {
        title: "Reminder",
        description: "WCINYP onboarding emails go out every Monday at 9am ET.",
        variant: "muted",
    },
    render: ({ title, description, variant }) => (
        <Alert variant={variant} icon={ClockFastForward}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    ),
};

export const Success: Story = {
    args: {
        title: "Invite sent",
        description: "New administrators receive a one-time email to finish account setup.",
    },
    render: ({ title, description }) => (
        <Alert icon={Mail01}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    ),
};

export default meta;

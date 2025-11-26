import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/base/buttons/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";

type CardStoryProps = {
    title: string;
    description: string;
    body: string;
    primaryAction: string;
    secondaryAction: string;
};

const meta = {
    title: "Shadcn/Card",
    component: Card,
    tags: ["autodocs"],
    args: {
        title: "Quarterly review",
        description: "Give WCINYP leaders a clear snapshot of hiring, staffing, and training.",
        body: "Summaries roll up directly from the people, roles, and tags stored in the supertool so managers always have the latest context.",
        primaryAction: "View report",
        secondaryAction: "Share",
    },
    argTypes: {
        body: { control: "text" },
    },
} satisfies Meta<CardStoryProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: ({ title, description, body, primaryAction, secondaryAction }) => (
        <Card className="max-w-xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-secondary">{body}</p>
            </CardContent>
            <CardFooter>
                <Button size="sm">{primaryAction}</Button>
                <Button color="secondary" size="sm">
                    {secondaryAction}
                </Button>
            </CardFooter>
        </Card>
    ),
};

export const WithTertiaryAction: Story = {
    args: {
        secondaryAction: "Archive",
    },
    render: ({ title, description, body, primaryAction, secondaryAction }) => (
        <Card className="max-w-xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-secondary">{body}</p>
            </CardContent>
            <CardFooter>
                <Button size="sm">{primaryAction}</Button>
                <Button color="secondary" size="sm">
                    {secondaryAction}
                </Button>
                <Button color="tertiary" size="sm">
                    Remind me later
                </Button>
            </CardFooter>
        </Card>
    ),
};

export default meta;

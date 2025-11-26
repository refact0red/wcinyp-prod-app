import type { Meta, StoryObj } from "@storybook/react";
import { BarChartSquare02, List, Map01, Rows01 } from "@untitledui/icons";

import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";

const meta = {
    title: "Untitled UI/Button Group",
    component: ButtonGroup,
    tags: ["autodocs"],
    args: {
        selectedKeys: ["list"],
        size: "md",
    },
    argTypes: {
        selectedKeys: { control: false },
        defaultSelectedKeys: { control: false },
        selectionMode: { control: false },
        size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <ButtonGroupItem id="list" iconLeading={List}>
                List
            </ButtonGroupItem>
            <ButtonGroupItem id="grid" iconLeading={Rows01}>
                Grid
            </ButtonGroupItem>
            <ButtonGroupItem id="map" iconLeading={Map01}>
                Map
            </ButtonGroupItem>
            <ButtonGroupItem id="report" iconLeading={BarChartSquare02}>
                Reports
            </ButtonGroupItem>
        </ButtonGroup>
    ),
} satisfies Meta<typeof ButtonGroup>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
    args: { size: "sm" },
};

export const IconsOnly: Story = {
    render: (args) => (
        <ButtonGroup {...args} aria-label="Views">
            <ButtonGroupItem id="list" iconLeading={List} aria-label="List view" />
            <ButtonGroupItem id="grid" iconLeading={GridDots} aria-label="Grid view" />
            <ButtonGroupItem id="map" iconLeading={Map01} aria-label="Map view" />
        </ButtonGroup>
    ),
};

export default meta;

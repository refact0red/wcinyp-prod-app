import type { Meta, StoryObj } from "@storybook/react";
import { Building07, Plus, User01 } from "@untitledui/icons";

import { Select } from "@/components/base/select/select";

const people = [
    { id: "emily", label: "Emily Park", supportingText: "Operations", avatarUrl: "https://i.pravatar.cc/150?img=47" },
    { id: "mike", label: "Mike Chen", supportingText: "Radiology", avatarUrl: "https://i.pravatar.cc/150?img=33" },
    { id: "carla", label: "Carla Santos", supportingText: "IT Security", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    { id: "nora", label: "Nora Patel", supportingText: "Scheduling", avatarUrl: "https://i.pravatar.cc/150?img=5" },
];

const locations = [
    { id: "jay", label: "Jay St Clinic", supportingText: "Brooklyn" },
    { id: "upper-east", label: "Upper East Side", supportingText: "Manhattan" },
    { id: "queens", label: "Queens", supportingText: "Forest Hills" },
];

const meta = {
    title: "Untitled UI/Select",
    component: Select,
    tags: ["autodocs"],
    args: {
        placeholder: "Choose a person",
        size: "md",
        label: "Assign owner",
    },
    argTypes: {
        size: { control: "inline-radio", options: ["sm", "md"] },
    },
    render: (args) => (
        <div className="max-w-sm">
            <Select {...args} items={people}>
                {(item) => (
                    <Select.Item id={item.id} textValue={item.label}>
                        {item.label} <span className="text-tertiary">• {item.supportingText}</span>
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholderIcon: Story = {
    args: {
        placeholder: "Pick a clinic",
        label: "Clinic",
        items: locations,
        placeholderIcon: Building07,
        defaultSelectedKey: "jay",
    },
    render: (args) => (
        <div className="max-w-sm">
            <Select {...args}>
                {(item) => (
                    <Select.Item id={item.id} textValue={item.label}>
                        {item.label} <span className="text-tertiary">• {item.supportingText}</span>
                    </Select.Item>
                )}
            </Select>
        </div>
    ),
};

export const ComboBox: Story = {
    render: () => (
        <div className="max-w-sm">
            <Select.ComboBox
                defaultItems={people}
                label="Find admin"
                inputProps={{ placeholder: "Search WCINYP admins…" }}
                iconLeading={User01}
                rightAdornment={<Plus className="size-4 text-brand" />}
                description="Type to search the directory; we show live tags and units."
            >
                {(item) => (
                    <Select.Item id={item.id} textValue={item.label}>
                        {item.label} <span className="text-tertiary">• {item.supportingText}</span>
                    </Select.Item>
                )}
            </Select.ComboBox>
        </div>
    ),
};

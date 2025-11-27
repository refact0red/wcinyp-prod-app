import type { Meta, StoryObj } from "@storybook/react";

import { TagCheckbox } from "@/components/base/tags/base-components/tag-checkbox";
import { TagGroup, TagList } from "@/components/base/tags/tags";

const tagItems = [
    { id: "nurse-lead", label: "Nurse Lead", count: 18 },
    { id: "it", label: "IT", count: 9, dot: true },
    { id: "operations", label: "Operations", count: 5, avatarSrc: "https://i.pravatar.cc/100?img=15" },
    { id: "management", label: "Management", count: 7 },
];

const meta = {
    title: "Untitled UI/Tags",
    tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Selectable: Story = {
    render: () => (
        <TagGroup label="Roles" selectionMode="multiple" size="md" defaultSelectedKeys={["nurse-lead", "it"]}>
            <TagList className="flex flex-wrap gap-2">
                {tagItems.map((tag) => (
                    <TagCheckbox key={tag.id} {...tag} />
                ))}
            </TagList>
        </TagGroup>
    ),
};

export const Readonly: Story = {
    render: () => (
        <TagGroup label="Filters" selectionMode="none" size="sm">
            <TagList className="flex flex-wrap gap-2">
                {tagItems.map((tag) => (
                    <TagCheckbox key={tag.id} {...tag} isDisabled />
                ))}
            </TagList>
        </TagGroup>
    ),
};

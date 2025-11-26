import type { Meta, StoryObj } from "@storybook/react";
import { Archive, Copy06, Edit02, Trash03 } from "@untitledui/icons";

import { Dropdown } from "@/components/base/dropdown/dropdown";

const meta = {
    title: "Untitled UI/Dropdown",
    tags: ["autodocs"],
    parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Dropdown.Root>
            <Dropdown.DotsButton />
            <Dropdown.Popover>
                <Dropdown.Menu aria-label="Actions">
                    <Dropdown.Section>
                        <Dropdown.SectionHeader className="px-3 pb-1 text-xs font-semibold text-tertiary">Record actions</Dropdown.SectionHeader>
                        <Dropdown.Item id="edit" label="Edit" icon={Edit02} />
                        <Dropdown.Item id="duplicate" label="Duplicate" icon={Copy06} addon="⌘D" />
                        <Dropdown.Item id="archive" label="Archive" icon={Archive} />
                    </Dropdown.Section>
                    <Dropdown.Separator />
                    <Dropdown.Item id="delete" label="Delete" icon={Trash03} />
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    ),
};

export const WithCustomTrigger: Story = {
    render: () => (
        <Dropdown.Root>
            <button className="rounded-md border border-primary bg-primary px-3 py-2 text-sm font-semibold text-secondary shadow-xs">Actions</button>
            <Dropdown.Popover>
                <Dropdown.Menu aria-label="Actions">
                    <Dropdown.Item id="share" label="Share with admins" addon="Shift+S" />
                    <Dropdown.Item id="notify" label="Notify leads" />
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    ),
};

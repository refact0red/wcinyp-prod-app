import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@/components/base/checkbox/checkbox";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Toggle } from "@/components/base/toggle/toggle";

const meta = {
    title: "Untitled UI/Selection Controls",
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Checkboxes: Story = {
    render: () => (
        <div className="flex flex-col gap-3">
            <Checkbox value="hq" size="md" defaultSelected label="Include HQ admins" hint="Required for WCINYP escalations." />
            <Checkbox value="remote" size="md" label="Include remote staff" hint="Show people tagged with Remote or Hybrid." />
            <Checkbox value="trainees" size="md" isIndeterminate label="Include trainees" hint="Partially synced; needs review." />
            <Checkbox value="disabled" size="md" isDisabled label="Disabled checkbox" hint="Unavailable in this context." />
        </div>
    ),
};

export const Radios: Story = {
    render: () => (
        <RadioGroup label="Directory scope" className="flex flex-col gap-3" defaultValue="staff" size="md">
            <RadioButton value="staff" label="Staff" hint="Front desk, technologists, and support." />
            <RadioButton value="clinicians" label="Clinicians" hint="Radiologists, fellows, residents." />
            <RadioButton value="contractors" label="Contractors" hint="Consultants and vendors." />
        </RadioGroup>
    ),
};

export const Toggles: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Toggle size="md" defaultSelected aria-label="Alerts">
                Send outage alerts
            </Toggle>
            <Toggle size="md" slim aria-label="Data sync" defaultSelected>
                Auto-sync provider data
            </Toggle>
            <Toggle size="md" aria-label="Dark mode">
                Enable dark mode
            </Toggle>
            <Toggle size="md" aria-label="Disabled" isDisabled defaultSelected>
                Disabled toggle
            </Toggle>
        </div>
    ),
};

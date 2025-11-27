import type { Meta, StoryObj } from "@storybook/react";
import { Mail01, Phone, User01 } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";

const meta = {
    title: "Untitled UI/Form",
    tags: ["autodocs"],
    parameters: { layout: "centered" },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <div className="w-full max-w-xl rounded-xl border border-primary bg-primary p-6 shadow-sm">
            <Form className="flex flex-col gap-4">
                <Input label="Full name" placeholder="Jane Doe" icon={User01} isRequired size="md" />
                <Input label="Work email" placeholder="you@wcinyp.org" icon={Mail01} type="email" size="md" />
                <Input label="Phone" placeholder="(555) 555-5555" icon={Phone} size="md" />
                <TextArea label="Notes" placeholder="Context for WCINYP admins…" minRows={3} />
                <div className="flex gap-3 pt-2">
                    <Button size="sm">Save</Button>
                    <Button color="secondary" size="sm">
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    ),
};

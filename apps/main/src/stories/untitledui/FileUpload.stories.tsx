import type { Meta, StoryObj } from "@storybook/react";
import { UploadCloud02 } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";

const meta = {
    title: "Untitled UI/File Upload",
    tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <FileTrigger acceptedFileTypes={[".csv", ".xlsx"]} onSelect={(files) => console.info("Selected files", files)}>
            <Button size="sm" iconLeading={UploadCloud02}>
                Upload roster CSV
            </Button>
        </FileTrigger>
    ),
};

export const DirectoryUpload: Story = {
    render: () => (
        <FileTrigger acceptDirectory allowsMultiple onSelect={(files) => console.info("Selected directory files", files)}>
            <Button color="secondary" size="sm">
                Upload folder of scans
            </Button>
        </FileTrigger>
    ),
};

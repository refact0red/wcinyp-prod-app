"use client";

import { FileIcon } from "@untitledui/file-icons";
import { UploadCloud02 } from "@untitledui/icons";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import uploadedFiles from "@/components/application/table/uploaded-files.json";
import { Button } from "@/components/base/buttons/button";

type UploadedFile = {
    name: string;
    size: string;
    uploadedAt: string;
    updatedAt: string;
    uploadedBy: string;
};

export const Table04DividerLine = () => {
    const items = (uploadedFiles as { items: UploadedFile[] }).items;

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Appointment Forms"
                className="pb-5"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="md" color="secondary">
                            Download all
                        </Button>
                        <Button size="md" iconLeading={UploadCloud02}>
                            Upload
                        </Button>
                    </div>
                }
            />
            <Table aria-label="Team members" selectionMode="multiple">
                <Table.Header>
                    <Table.Head id="name" label="File name" isRowHeader />
                    <Table.Head id="size" label="File size" />
                    <Table.Head id="uploadedAt" label="Date uploaded" />
                    <Table.Head id="updatedAt" label="Last updated" className="md:hidden xl:table-cell" />
                    <Table.Head id="uploadedBy" label="Uploaded by" />
                    <Table.Head id="actions" />
                </Table.Header>
                <Table.Body items={items}>
                    {(item) => (
                        <Table.Row id={item.name}>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <FileIcon type={item.name.split(".")[1]} theme="light" className="size-10 dark:hidden" />
                                    <FileIcon type={item.name.split(".")[1]} theme="dark" className="size-10 not-dark:hidden" />

                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.name}</p>
                                        <p className="text-sm text-tertiary">{item.size}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.size}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.updatedAt}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.uploadedBy}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex items-center justify-end">
                                    <TableRowActionsDropdown />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};

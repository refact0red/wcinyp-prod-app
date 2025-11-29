import type { Metadata } from "next";
import { UploadCloudIcon } from "lucide-react";

import { DriveSidebar } from "./drive-sidebar";
import { DriveTable } from "@/components/shadcn/drive-table";
import { LabShell } from "@/components/shadcn/lab-shell";
import { Button } from "@/components/shadcn/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";

export const metadata: Metadata = {
    title: "Drive",
};

export default function DrivePage() {
    return (
        <LabShell
            title="Drive"
            actions={
                <Button size="sm">
                    <UploadCloudIcon className="size-4" />
                    Upload
                </Button>
            }
        >
            <div className="flex flex-1 flex-col">
                <div className="container @container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="grid gap-6 px-4 lg:grid-cols-[1fr_260px] lg:px-6">
                            <div className="flex flex-col gap-4">
                                <Tabs defaultValue="appointment" className="w-full">
                                    <TabsList className="w-fit">
                                        <TabsTrigger value="appointment">Appointment</TabsTrigger>
                                        <TabsTrigger value="financial">Financial</TabsTrigger>
                                        <TabsTrigger value="misc">Miscellanous</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="appointment" className="mt-4">
                                        <DriveTable />
                                    </TabsContent>
                                    <TabsContent value="financial" className="mt-4">
                                        <div className="text-sm text-muted-foreground">No financial files yet.</div>
                                    </TabsContent>
                                    <TabsContent value="misc" className="mt-4">
                                        <div className="text-sm text-muted-foreground">No miscellaneous files yet.</div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            <div className="self-start">
                                <DriveSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LabShell>
    );
}

import { UploadCloudIcon } from "lucide-react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { DriveTable } from "@/components/shadcn/drive-table";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Button } from "@/components/shadcn/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

export default function DrivePage() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Drive"
                    actions={
                        <Button size="sm">
                            <UploadCloudIcon className="size-4" />
                            Upload
                        </Button>
                    }
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
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
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

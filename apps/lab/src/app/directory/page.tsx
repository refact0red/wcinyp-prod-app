import { HospitalIcon, PlusIcon, RadiationIcon, UsersIcon } from "lucide-react";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { DirectoryTable } from "@/components/shadcn/directory-table";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Button } from "@/components/shadcn/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

export default function DirectoryPage() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader
                    title="Directory"
                    actions={
                        <Button size="sm">
                            <PlusIcon className="size-4" />
                            Add person
                        </Button>
                    }
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <Tabs defaultValue="people" className="w-full">
                                    <TabsList className="w-fit">
                                        <TabsTrigger value="people" className="gap-2">
                                            <UsersIcon className="size-4" />
                                            People
                                        </TabsTrigger>
                                        <TabsTrigger value="locations" className="gap-2">
                                            <HospitalIcon className="size-4" />
                                            Locations
                                        </TabsTrigger>
                                        <TabsTrigger value="radiologists" className="gap-2">
                                            <RadiationIcon className="size-4" />
                                            Radiologists
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="people" className="mt-4">
                                        <DirectoryTable />
                                    </TabsContent>
                                    <TabsContent value="locations" className="mt-4">
                                        <div className="text-sm text-muted-foreground">No locations yet.</div>
                                    </TabsContent>
                                    <TabsContent value="radiologists" className="mt-4">
                                        <div className="text-sm text-muted-foreground">No radiologists yet.</div>
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

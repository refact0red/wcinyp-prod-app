"use client";

import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SiteHeader } from "@/components/shadcn/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/ui/sidebar";

// TODO: When shaping this workflow, explicitly prompt users to write down any problem that needs a solution—whether a digital tool, report, feature, or everyday workflow issue that could be done better.

export default function FeedbackAdminPage() {
    return (
        <SidebarProvider className="bg-sidebar">
            <AppSidebar />
            <SidebarInset>
                <SiteHeader
                    title="Feedback"
                    showBreadcrumbs={false}
                />
                <div className="flex flex-1 flex-col">
                    <div className="container @container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <Card className="max-w-2xl">
                                <CardHeader>
                                    <CardTitle className="text-base font-semibold">
                                        What&apos;s a problem that needs a solution?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Think about any friction in your day-to-day work—something that feels manual,
                                        slow, or easy to get wrong. It could be a digital tool, report, feature, or
                                        simple workflow that could be clearer or faster.
                                    </p>
                                    <Textarea
                                        className="min-h-[160px]"
                                        placeholder="Describe the problem in your own words. Focus on the workflow or decision, not the specific solution."
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SearchLg, UploadCloud02, Users01 } from "@untitledui/icons";
import type { Key } from "react-aria-components";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table01DividerLineSm } from "@/components/application/table/table-01-divider-line-sm";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";

const contentTypeTabs = [
    { id: "all", label: "All content" },
    { id: "people", label: "People" },
    { id: "teams", label: "Teams" },
    { id: "providers", label: "Providers" },
    { id: "guests", label: "Guests" },
];

export const DirectoryScreen = () => {
    const pathname = usePathname();
    const [selectedContentType, setSelectedContentType] = useState<Key>(contentTypeTabs[0].id);

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSimple
                activeUrl={pathname}
                items={navItemsSimple}
                footerItems={footerItems}
            />

            <main className="flex-1">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                    <SectionHeader.Root>
                        <SectionHeader.Group>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <p className="text-sm font-semibold text-brand-secondary">Directory</p>
                                <SectionHeader.Heading>People and teams</SectionHeader.Heading>
                                <SectionHeader.Subheading>Find teammates, see which teams they are on, and make updates quickly.</SectionHeader.Subheading>
                            </div>
                            <div className="w-full md:w-80">
                                <Input shortcut size="sm" aria-label="Search" placeholder="Search directory" icon={SearchLg} />
                            </div>
                        </SectionHeader.Group>

                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
                            <div className="w-full sm:hidden">
                                <NativeSelect
                                    aria-label="Filter directory"
                                    value={String(selectedContentType)}
                                    onChange={(event) => setSelectedContentType(event.target.value)}
                                    options={contentTypeTabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                                />
                            </div>
                            <div className="hidden flex-1 sm:block">
                                <Tabs selectedKey={selectedContentType} onSelectionChange={setSelectedContentType}>
                                    <TabList type="button-border" className="flex w-full flex-wrap gap-2" items={contentTypeTabs} />
                                </Tabs>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button color="secondary" size="sm" iconLeading={UploadCloud02}>
                                    Export list
                                </Button>
                                <Button size="sm" iconLeading={Users01}>
                                    Invite teammate
                                </Button>
                            </div>
                        </div>
                    </SectionHeader.Root>

                    <Table01DividerLineSm />
                </div>
            </main>
        </div>
    );
};

"use client";

import { usePathname } from "next/navigation";
import { UploadCloud02, Users01 } from "@untitledui/icons";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { Table01DividerLineSm } from "@/components/application/table/table-01-divider-line-sm";
import { Button } from "@/components/base/buttons/button";

export const DirectoryScreen = () => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSimple
                activeUrl={pathname}
                items={navItemsSimple}
                footerItems={footerItems}
            />

            <main className="flex-1">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-brand-secondary">Directory</p>
                            <h1 className="text-display-xs font-semibold text-primary">People and teams</h1>
                            <p className="text-md text-tertiary">Find teammates, see which teams they are on, and make updates quickly.</p>
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

                    <Table01DividerLineSm />
                </div>
            </main>
        </div>
    );
};

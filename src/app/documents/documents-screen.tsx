"use client";

import { usePathname } from "next/navigation";
import { UploadCloud02 } from "@untitledui/icons";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { Table04DividerLine } from "@/components/application/table/table-04-divider-line";
import { Button } from "@/components/base/buttons/button";

export const PublicDriveScreen = () => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSimple
                activeUrl={pathname}
                items={navItemsSimple}
                footerItems={footerItems}
            />

            <div className="flex min-h-dvh flex-1 flex-col">
                <HeaderTopActions activeUrl={pathname} sidebarItems={navItemsSimple} />

                <main className="flex-1">
                    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-brand-secondary">Drive</p>
                                <h1 className="text-display-xs font-semibold text-primary">Team drive</h1>
                                <p className="text-md text-tertiary">Upload, review, and organize the documents your team relies on.</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button color="secondary" size="sm">
                                    New folder
                                </Button>
                                <Button size="sm" iconLeading={UploadCloud02}>
                                    Upload files
                                </Button>
                            </div>
                        </div>

                        <Table04DividerLine />
                    </div>
                </main>
            </div>
        </div>
    );
};

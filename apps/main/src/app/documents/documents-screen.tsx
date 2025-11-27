"use client";

import { usePathname } from "next/navigation";
import { UploadCloud02 } from "@untitledui/icons";
import { navItemsFlat, navSections } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Table04DividerLine } from "@/components/application/table/table-04-divider-line";
import { Button } from "@/components/base/buttons/button";

export const PublicDriveScreen = () => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSectionsSubheadings activeUrl={pathname} items={navSections} />

            <div className="flex min-h-dvh flex-1 flex-col">
                <HeaderTopActions activeUrl={pathname} sidebarItems={navItemsFlat} />

                <main className="flex-1">
                    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                        <Table04DividerLine />
                    </div>
                </main>
            </div>
        </div>
    );
};

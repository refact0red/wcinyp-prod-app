"use client";

import { usePathname } from "next/navigation";
import { navItemsFlat, navSections } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";

export const HomeScreen = () => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSectionsSubheadings activeUrl={pathname} items={navSections} />

            <div className="flex min-h-dvh flex-1 flex-col">
                <HeaderTopActions activeUrl={pathname} sidebarItems={navItemsFlat} />

                <main className="flex-1" />
            </div>
        </div>
    );
};

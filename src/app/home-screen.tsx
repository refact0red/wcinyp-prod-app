"use client";

import { usePathname } from "next/navigation";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";

export const HomeScreen = () => {
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

                <main className="flex-1" />
            </div>
        </div>
    );
};

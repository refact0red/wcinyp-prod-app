"use client";

import { usePathname } from "next/navigation";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";

export const DocumentationScreen = () => {
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
                    {/* Intentionally left empty; template coming soon. */}
                </div>
            </main>
        </div>
    );
};

"use client";

import { usePathname } from "next/navigation";
import { SearchLg } from "@untitledui/icons";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table01DividerLineSm } from "@/components/application/table/table-01-divider-line-sm";
import { Input } from "@/components/base/input/input";

export const DirectoryScreen = () => {
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
                        <div className="overflow-hidden rounded-2xl border border-secondary bg-primary shadow-xs">
                            <div className="flex flex-col gap-5 border-b border-secondary p-4 md:p-5">
                                <SectionHeader.Group>
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                        <SectionHeader.Heading>People and teams</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Find teammates, see which teams they are on, and make updates quickly.</SectionHeader.Subheading>
                                    </div>
                                    <div className="w-full md:w-80">
                                        <Input shortcut size="sm" aria-label="Search" placeholder="Search directory" icon={SearchLg} />
                                    </div>
                                </SectionHeader.Group>
                            </div>

                            <Table01DividerLineSm withCard={false} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

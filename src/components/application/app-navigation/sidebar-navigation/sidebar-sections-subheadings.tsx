"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavItemBase } from "../base-components/nav-item";
import type { NavItemType } from "../config";

interface SidebarNavigationSectionsSubheadingsProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: Array<{ label: string; items: NavItemType[] }>;
    /** Whether to hide the right side border. */
    hideBorder?: boolean;
}

export const SidebarNavigationSectionsSubheadings = ({ activeUrl = "/", items, hideBorder = false }: SidebarNavigationSectionsSubheadingsProps) => {
    const MAIN_SIDEBAR_WIDTH = 256;

    const content = (
        <aside
            style={
                {
                    "--width": `${MAIN_SIDEBAR_WIDTH}px`,
                } as React.CSSProperties
            }
            className={cx(
                "flex h-full w-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-6",
                !hideBorder && "border-secondary md:border-r",
            )}
        >
            <div className="flex flex-col gap-5 px-4 lg:px-5">
                <UntitledLogo className="h-8" />
            </div>

            <ul className="mt-8">
                {items.map((group) => (
                    <li key={group.label}>
                        <div className="px-5 pb-1">
                            <p className="text-xs font-bold text-quaternary uppercase">{group.label}</p>
                        </div>
                        <ul className="px-4 pb-5">
                            {group.items.map((item) => (
                                <li key={item.label} className="py-0.5">
                                    <NavItemBase icon={item.icon} href={item.href} badge={item.badge} type="link" current={item.href === activeUrl}>
                                        {item.label}
                                    </NavItemBase>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <div className="mt-auto py-4 lg:py-4" />
        </aside>
    );

    return (
        <>
            {/* Mobile header navigation */}
            <MobileNavigationHeader>{content}</MobileNavigationHeader>

            {/* Desktop sidebar navigation */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>

            {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
            <div
                style={{
                    paddingLeft: MAIN_SIDEBAR_WIDTH,
                }}
                className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
            />
        </>
    );
};

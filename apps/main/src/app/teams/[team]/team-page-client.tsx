"use client";

import { navItemsFlat, navSections, teamNavItems } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";

type TeamPageClientProps = {
    teamSlug: string;
};

const findTeamBySlug = (slug: string) => {
    return teamNavItems.find((item) => item.href?.toLowerCase() === `/teams/${slug.toLowerCase()}`);
};

export const TeamPageClient = ({ teamSlug }: TeamPageClientProps) => {
    const team = findTeamBySlug(teamSlug);

    if (!team || !team.href) {
        return null;
    }

    const activeUrl = team.href;

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSectionsSubheadings activeUrl={activeUrl} items={navSections} />

            <div className="flex min-h-dvh flex-1 flex-col">
                <HeaderTopActions activeUrl={activeUrl} sidebarItems={navItemsFlat} />

                <main className="flex-1">
                    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                        <div className="flex flex-col gap-2 rounded-2xl border border-secondary bg-primary p-6 shadow-xs">
                            <p className="text-sm font-semibold text-brand-secondary">Your teams</p>
                            <h1 className="text-display-xs font-semibold text-primary">{team.label}</h1>
                            <p className="text-md text-tertiary">Team space placeholder. Add content for {team.label} when ready.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

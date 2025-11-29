"use client";

import { usePathname } from "next/navigation";
import { Database03, UploadCloud02, Users01 } from "@untitledui/icons";
import { navItemsFlat, navSections } from "@/app/nav-items";
import { HeaderTopActions } from "@/components/application/app-navigation/header-top-actions";
import { SidebarNavigationSectionsSubheadings } from "@/components/application/app-navigation/sidebar-navigation/sidebar-sections-subheadings";
import { Table01DividerLineSm, type DirectoryTableItem } from "@/components/application/table/table-01-divider-line-sm";
import providerDirectory from "@/components/application/table/provider-directory.json" assert { type: "json" };
import providerCommonMistakes from "@/components/application/table/provider-common-mistakes.json" assert { type: "json" };
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";

type ProviderMistakeRow = {
    commonName: string;
    commonNpi: string;
    mistakenName: string;
    mistakenNpi: string;
};

export const ProviderDatabaseScreen = () => {
    const pathname = usePathname();
    const providers = (providerDirectory as { items: DirectoryTableItem[] }).items;
    const mistakes = (providerCommonMistakes as { items: ProviderMistakeRow[] }).items;

    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <SidebarNavigationSectionsSubheadings activeUrl={pathname} items={navSections} />

            <div className="flex min-h-dvh flex-1 flex-col">
                <HeaderTopActions activeUrl={pathname} sidebarItems={navItemsFlat} />

                <main className="flex-1">
                    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-6 md:px-8 lg:pt-10">
                        <Tabs defaultSelectedKey="database" className="gap-4">
                            <Tabs.List
                                aria-label="Provider database views"
                                items={[
                                    { id: "database", label: "Provider database" },
                                    { id: "common-mistakes", label: "Common mistakes" },
                                ]}
                                size="sm"
                                type="button-border"
                            >
                                {(item) => (
                                    <Tabs.Item key={item.id} id={item.id}>
                                        {item.label}
                                    </Tabs.Item>
                                )}
                            </Tabs.List>

                            <Tabs.Panel id="database" className="mt-2">
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-brand-secondary">Providers</p>
                                            <h1 className="text-display-xs font-semibold text-primary">
                                                External providers and clinics
                                            </h1>
                                            <p className="text-md text-tertiary">
                                                Track referral partners, view clinic details, and keep contact info up to
                                                date.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Button color="secondary" size="sm" iconLeading={UploadCloud02}>
                                                Export providers
                                            </Button>
                                            <Button size="sm" iconLeading={Users01} iconTrailing={Database03}>
                                                Add provider
                                            </Button>
                                        </div>
                                    </div>

                                    <Table01DividerLineSm
                                        title="Provider database"
                                        badgeLabel={`${providers.length} providers`}
                                        items={providers}
                                    />
                                </div>
                            </Tabs.Panel>

                            {/* NOTE: Temporary "Common mistakes" view added while exploring provider data; safe to remove once no longer needed. */}
                            <Tabs.Panel id="common-mistakes" className="mt-2">
                                <div className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-4 shadow-xs md:p-6">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-lg font-semibold text-primary">
                                            Common provider selection mistakes
                                        </h2>
                                        <p className="text-sm text-tertiary">
                                            Review this list and verify providers by full name and office information.
                                            The common provider is usually the correct option.
                                        </p>
                                    </div>

                                    <div className="overflow-hidden rounded-xl border border-secondary bg-primary_alt">
                                        <div className="grid grid-cols-2 border-b border-secondary bg-secondary_alt px-3 py-2 text-xs font-semibold uppercase tracking-wide text-tertiary md:px-4">
                                            <div>Common provider</div>
                                            <div>Mistaken provider</div>
                                        </div>
                                        <div className="divide-y divide-secondary">
                                            {mistakes.map((row) => (
                                                <div
                                                    key={`${row.commonName}-${row.mistakenName}`}
                                                    className="grid grid-cols-2 text-sm md:px-4"
                                                >
                                                    <div className="border-r border-secondary px-3 py-3 md:px-4">
                                                        <div className="font-semibold text-primary">
                                                            {row.commonName}
                                                        </div>
                                                        <div className="text-xs text-tertiary">
                                                            NPI:&nbsp;
                                                            <a
                                                                className="underline-offset-2 hover:underline"
                                                                href={`https://npiregistry.cms.hhs.gov/registry/search-results-table?number=${row.commonNpi}`}
                                                                target="_blank"
                                                                rel="noreferrer noopener"
                                                            >
                                                                {row.commonNpi}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="px-3 py-3 md:px-4">
                                                        <div className="font-medium text-primary">
                                                            {row.mistakenName}
                                                        </div>
                                                        <div className="text-xs text-tertiary">
                                                            NPI:&nbsp;
                                                            <a
                                                                className="underline-offset-2 hover:underline"
                                                                href={`https://npiregistry.cms.hhs.gov/registry/search-results-table?number=${row.mistakenNpi}`}
                                                                target="_blank"
                                                                rel="noreferrer noopener"
                                                            >
                                                                {row.mistakenNpi}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
};

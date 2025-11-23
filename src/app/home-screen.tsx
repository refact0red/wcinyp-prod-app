"use client";

import { usePathname } from "next/navigation";
import {
    BookOpen01,
    Check,
    Copy01,
    Cube01,
    HelpCircle,
    Server03,
    UploadCloud02,
    Users01,
} from "@untitledui/icons";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { navItemsSimple, footerItems } from "@/app/nav-items";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useClipboard } from "@/hooks/use-clipboard";

export const HomeScreen = () => {
    const clipboard = useClipboard();
    const pathname = usePathname();

    const renderCommandRow = (title: string, command: string, id: string) => (
        <div key={id} className="flex flex-col gap-2 rounded-xl border border-secondary bg-secondary/50 px-4 py-3 shadow-xs">
            <div className="text-sm font-semibold text-primary">{title}</div>
            <div className="flex items-center gap-2">
                <code className="flex-1 overflow-auto whitespace-nowrap font-mono text-sm text-secondary">{command}</code>
                <ButtonUtility
                    color="secondary"
                    size="sm"
                    tooltip={clipboard.copied === id ? "Copied" : "Copy command"}
                    icon={clipboard.copied === id ? Check : Copy01}
                    onClick={() => clipboard.copy(command, id)}
                />
            </div>
        </div>
    );

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
                            <p className="text-sm font-semibold text-brand-secondary">Home</p>
                            <h1 className="text-display-xs font-semibold text-primary">Untitled UI workspace</h1>
                            <p className="text-md text-tertiary">Kick off projects, invite teammates, and add components without leaving this starter.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm" iconLeading={Server03} href="/documents">
                                Go to documents
                            </Button>
                            <Button color="secondary" size="sm" iconLeading={Users01} href="/users">
                                Invite teammates
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-xs">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-primary">Get started quickly</h2>
                                <p className="mt-1 text-sm text-tertiary">
                                    Pull components or navigate to documents to begin uploading team files.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button size="sm" iconLeading={UploadCloud02} href="/documents">
                                    Upload files
                                </Button>
                                <Button size="sm" color="secondary" href="/directory">
                                    View directory
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-xs">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-primary">Add more components</h2>
                                <p className="mt-1 text-sm text-tertiary">
                                    Pull any layout from the Untitled UI CLI without leaving your editor.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    href="https://www.untitledui.com/react/docs/introduction"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="link-color"
                                    size="sm"
                                    iconLeading={BookOpen01}
                                >
                                    Docs
                                </Button>
                                <Button
                                    href="https://www.untitledui.com/react/resources/icons"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="link-color"
                                    size="sm"
                                    iconLeading={Cube01}
                                >
                                    Icons
                                </Button>
                                <Button
                                    href="https://github.com/untitleduico/react/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="link-color"
                                    size="sm"
                                    iconLeading={HelpCircle}
                                >
                                    Help
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {renderCommandRow("Use the sidebar template", "npx untitledui@latest add sidebar-navigation-base", "sidebar-command")}
                            {renderCommandRow("Browse the component catalog", "npx untitledui@latest add", "catalog-command")}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

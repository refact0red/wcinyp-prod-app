import { Separator } from "@/components/shadcn/ui/separator";
import { SidebarTrigger } from "@/components/shadcn/ui/sidebar";

type SiteHeaderProps = {
    title?: string;
    actions?: React.ReactNode;
    showSidebarToggle?: boolean;
};

export function SiteHeader({ title = "Documents", actions, showSidebarToggle = true }: SiteHeaderProps) {
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="flex flex-1 items-center gap-1 lg:gap-2">
                    {showSidebarToggle && (
                        <>
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
                        </>
                    )}
                    <h1 className="text-base font-medium">{title}</h1>
                </div>
                {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
            </div>
        </header>
    );
}

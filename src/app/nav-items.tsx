import { Bookmark, BookOpen01, Calendar, ChevronRight, Database03, HomeLine, LayersTwo01, Rows01, SearchSm, Server03, Users01 } from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

const generalItems: NavItemType[] = [
    { label: "Home", href: "/", icon: HomeLine },
    { label: "Manual", href: "/manual", icon: BookOpen01 },
    { label: "Drive", href: "/drive", icon: Server03 },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { label: "Directory", href: "/directory", icon: Rows01 },
    { label: "Providers", href: "/providers", icon: Database03 },
    { label: "Amion", href: "/amion", icon: LayersTwo01 },
    { label: "NPI Lookup", href: "/npi-lookup", icon: SearchSm },
    { label: "Calendar", href: "/calendars", icon: Calendar },
];

const adminItems: NavItemType[] = [
    { label: "Users", href: "/users", icon: Users01 },
];

const teamItems: NavItemType[] = [
    {
        label: "SPRL",
        href: "/teams/sprl",
        icon: () => <Avatar src="https://www.untitledui.com/logos/images/Catalog.jpg" className="mr-2 size-5" />,
        badge: (
            <div className="flex items-center gap-3">
                <Badge size="sm" type="modern">
                    ⌘1
                </Badge>
                <ChevronRight size={16} className="text-fg-quaternary" />
            </div>
        ),
    },
    {
        label: "E61",
        href: "/teams/e61",
        icon: () => <Avatar src="https://www.untitledui.com/logos/images/Warpspeed.jpg" className="mr-2 size-5" />,
        badge: (
            <div className="flex items-center gap-3">
                <Badge size="sm" type="modern">
                    ⌘2
                </Badge>
                <ChevronRight size={16} className="text-fg-quaternary" />
            </div>
        ),
    },
    {
        label: "WGC",
        href: "/teams/wgc",
        icon: () => <Avatar src="https://www.untitledui.com/logos/images/Boltshift.jpg" className="mr-2 size-5" />,
        badge: (
            <div className="flex items-center gap-3">
                <Badge size="sm" type="modern">
                    ⌘3
                </Badge>
                <ChevronRight size={16} className="text-fg-quaternary" />
            </div>
        ),
    },
];

export const navSections = [
    { label: "General", items: generalItems },
    { label: "Admin", items: adminItems },
    { label: "Your teams", items: teamItems },
];

export const navItemsFlat: NavItemType[] = navSections.flatMap(({ items }) => items);
export const teamNavItems = teamItems;

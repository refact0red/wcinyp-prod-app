import { Bookmark, BookOpen01, Calendar, Database03, HomeLine, LayersTwo01, Rows01, SearchSm, Server03 } from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";

export const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
    },
    {
        label: "Manual",
        href: "/manual",
        icon: BookOpen01,
    },
    {
        label: "Drive",
        href: "/drive",
        icon: Server03,
    },
    {
        label: "Bookmarks",
        href: "/bookmarks",
        icon: Bookmark,
    },
    {
        label: "Directory",
        href: "/directory",
        icon: Rows01,
    },
    {
        label: "Providers",
        href: "/providers",
        icon: Database03,
    },
    {
        label: "Amion",
        href: "/amion",
        icon: LayersTwo01,
    },
    {
        label: "NPI Lookup",
        href: "/npi-lookup",
        icon: SearchSm,
    },
    {
        label: "Calendars",
        href: "/calendars",
        icon: Calendar,
    },
];

export const footerItems: NavItemType[] = [];

import { BookOpen01, Calendar, Database03, HomeLine, Rows01, Server03 } from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";

export const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
    },
    {
        label: "Manuals",
        href: "/manuals",
        icon: BookOpen01,
    },
    {
        label: "Drive",
        href: "/drive",
        icon: Server03,
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
        label: "Calendars",
        href: "/calendars",
        icon: Calendar,
    },
];

export const footerItems: NavItemType[] = [];

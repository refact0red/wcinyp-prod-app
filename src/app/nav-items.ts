import { BookOpen01, Database03, HomeLine, Rows01, Server03 } from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";

export const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
    },
    {
        label: "Documentation",
        href: "/documentation",
        icon: BookOpen01,
    },
    {
        label: "Public Drive",
        href: "/publicdrive",
        icon: Server03,
    },
    {
        label: "Directory",
        href: "/directory",
        icon: Rows01,
    },
    {
        label: "Provider Database",
        href: "/provider-database",
        icon: Database03,
    },
];

export const footerItems: NavItemType[] = [];

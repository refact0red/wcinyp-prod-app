import {
    BookOpen01,
    CheckDone01,
    Database03,
    HomeLine,
    PieChart03,
    Rows01,
    Server03,
    Settings01,
    Users01,
} from "@untitledui/icons";
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
        href: "/documents",
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
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/reporting",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users01,
    },
];

export const footerItems: NavItemType[] = [
    {
        label: "Settings",
        href: "/settings",
        icon: Settings01,
    },
];

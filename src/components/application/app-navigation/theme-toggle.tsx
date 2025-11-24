"use client";

import { useEffect, useState } from "react";
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { cx } from "@/utils/cx";

export const ThemeToggle = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const isDark = currentTheme === "dark";
    const Icon = isDark ? Sun : Moon01;

    const buttonClasses = cx(
        "relative flex size-10 items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none",
        "hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:text-fg-disabled_subtle disabled:hover:bg-primary disabled:hover:text-fg-disabled_subtle",
    );

    if (!isMounted) {
        return (
            <button type="button" aria-label="Loading theme" className={buttonClasses} disabled>
                <Moon01 aria-hidden className="size-5 shrink-0 transition-inherit-all" />
            </button>
        );
    }

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={buttonClasses}
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            <Icon aria-hidden className="size-5 shrink-0 transition-inherit-all" />
        </button>
    );
};

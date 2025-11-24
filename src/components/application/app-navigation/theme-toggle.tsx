"use client";

import { useEffect, useState } from "react";
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

export const ThemeToggle = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const isDark = currentTheme === "dark";
    const Icon = isDark ? Sun : Moon01;

    if (!isMounted) {
        return <ButtonUtility color="secondary" size="sm" isDisabled icon={Moon01} tooltip="Loading theme" />;
    }

    return (
        <ButtonUtility
            color="secondary"
            size="sm"
            tooltip={isDark ? "Switch to light mode" : "Switch to dark mode"}
            icon={Icon}
            onClick={() => setTheme(isDark ? "light" : "dark")}
        />
    );
};

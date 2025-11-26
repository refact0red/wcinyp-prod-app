import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "next-themes";
import React from "react";

import { RouteProvider } from "@/providers/router-provider";
import "@/styles/globals.css";

const preview: Preview = {
    parameters: {
        layout: "fullscreen",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: "App",
            values: [
                { name: "App", value: "var(--color-gray-50)" },
                { name: "Surface", value: "var(--color-white)" },
                { name: "Dark", value: "var(--color-gray-950)" },
            ],
        },
        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },
        nextjs: {
            appDirectory: true,
        },
    },
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for Untitled UI components",
            defaultValue: "light",
            toolbar: {
                icon: "circlehollow",
                items: [
                    { value: "light", title: "Light", icon: "sun" },
                    { value: "dark", title: "Dark", icon: "moon" },
                ],
            },
        },
    },
    decorators: [
        (Story, context) => (
            <ThemeProvider
                attribute="class"
                value={{ light: "light-mode", dark: "dark-mode" }}
                defaultTheme="light"
                enableSystem={false}
                forcedTheme={context.globals.theme}
            >
                <RouteProvider>
                    <div className="bg-primary text-secondary antialiased font-sans" style={{ ["--font-inter" as string]: "Inter" }}>
                        <div className="min-h-screen p-8">
                            <Story />
                        </div>
                    </div>
                </RouteProvider>
            </ThemeProvider>
        ),
    ],
};

export default preview;

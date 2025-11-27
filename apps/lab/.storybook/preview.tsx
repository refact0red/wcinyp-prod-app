import type { Preview } from "@storybook/nextjs-vite";
import React from "react";

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
        nextjs: {
            appDirectory: true,
        },
        a11y: {
            test: "todo",
        },
    },
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for Shadcn components",
            defaultValue: "dark",
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
        (Story, context) => {
            const theme = context.globals.theme ?? "light";

            React.useEffect(() => {
                if (typeof window === "undefined") return;

                const root = window.document.documentElement;
                root.classList.remove("light", "dark", "dark-mode");
                if (theme === "dark") {
                    root.classList.add("dark", "dark-mode");
                }
            }, [theme]);

            return (
                <div className="min-h-screen bg-background text-foreground antialiased">
                    <Story />
                </div>
            );
        },
    ],
};

export default preview;

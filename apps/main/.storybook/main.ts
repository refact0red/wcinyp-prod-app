import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-onboarding", "@storybook/addon-vitest", "@chromatic-com/storybook"],
    framework: {
        name: "@storybook/nextjs-vite",
        options: {
            nextConfigPath: path.resolve(__dirname, "../next.config.mjs"),
        },
    },
    staticDirs: ["../public"],
    docs: {
        autodocs: "tag",
    },
    viteFinal: async (config) => {
        // Mirror Next.js aliases and ensure packages are optimized for Vite.
        const resolvedConfig = mergeConfig(config, {
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "../src"),
                    "next/navigation": path.resolve(__dirname, "./next-navigation.mock.ts"),
                },
            },
            optimizeDeps: {
                include: ["@untitledui/icons"],
            },
        });

        return resolvedConfig;
    },
};

export default config;

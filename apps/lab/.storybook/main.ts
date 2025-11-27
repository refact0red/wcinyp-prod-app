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
    docs: {
        autodocs: "tag",
    },
    viteFinal: async (config) =>
        mergeConfig(config, {
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "../src"),
                    "@untitledui/icons": path.resolve(__dirname, "../node_modules/@untitledui/icons"),
                },
            },
        }),
};

export default config;

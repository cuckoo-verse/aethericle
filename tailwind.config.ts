import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";
import { getHeroUIColors } from "./utils/theme-colors";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: "var(--radius)",
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
            },
            ringColor: {
                DEFAULT: "var(--divider)",
            },
            animation: {
                "fade-in": "fadeIn var(--transition-duration) var(--transition-timing) forwards",
                "fade-out": "fadeOut var(--transition-duration) var(--transition-timing) forwards",
            },
            fontSize: {
                xs: "var(--text-xs)",
                base: "var(--text-base)",
                xl: "var(--text-xl)",
                "2xl": "var(--text-2xl)",
                "3xl": "var(--text-3xl)",
                "4xl": "var(--text-4xl)",
                "5xl": "var(--text-5xl)",
            }
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            addCommonColors: true,
            themes: {
                light: {
                    colors: getHeroUIColors("light"),
                },
                dark: {
                    colors: getHeroUIColors("dark"),
                },
            },
        })
    ],
};

export default config;
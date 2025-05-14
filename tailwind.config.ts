import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
    content: [
        "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui({
        themes: {
            dark: {
                colors: {
                    default :{
                        DEFAULT: "#27272a"
                    }
                }
            }
        }
    })],
};

export default config;
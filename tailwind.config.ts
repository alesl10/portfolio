import type { Config } from "tailwindcss";

// Design tokens live in src/app/globals.css via Tailwind v4 `@theme`.
// This file only declares content sources.
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        foreground: "#f4f1ea",
        clicks: {
          red: "#B3141B",
          scarlet: "#f70012",
          dark: "#080808",
          black: "#050505",
          surface: "#0e0e0e",
          card: "#141414",
          border: "#242424",
          paper: "#F4F1EA",
          papermuted: "#B8B3A8",
          muted: "#767676",
          subtle: "#333333",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Oswald", "Haettenschweiler", "Impact", "sans-serif"],
        editorial: ["'Newsreader'", "'Playfair Display'", "Georgia", "serif"],
        mono: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "shutter-flash": "shutterFlash 120ms ease-out forwards",
        "marquee": "marquee 28s linear infinite",
        "marquee-reverse": "marqueeReverse 28s linear infinite",
        "film-drift": "filmDrift 20s ease-in-out infinite alternate",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "aperture-spin": "apertureSpin 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      keyframes: {
        shutterFlash: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.95" },
          "100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        filmDrift: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.04) translate(-1%, -1%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        apertureSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

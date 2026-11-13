import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fondo: negro apenas frío, en capas
        ink: {
          950: "#07080a",
          900: "#0b0c0f",
          850: "#0f1114",
          800: "#14161a",
          700: "#1c1f25",
          600: "#2a2e36",
        },
        // Texto: del blanco hueso al gris acero
        steel: {
          100: "#efeeea",
          200: "#d9dbde",
          300: "#b4b8bf",
          400: "#9297a0",
          500: "#7b818a",
        },
        // Acento de marca: se usa plano y con moderación
        gold: {
          600: "#b3862b",
          500: "#d4a13a",
          400: "#e2b655",
          300: "#eccb7a",
          200: "#f5e1a8",
        },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        site: "82rem",
      },
      animation: {
        scan: "scan 3.2s ease-in-out infinite",
        blink: "blink 2.4s ease-in-out infinite",
        menuIn: "menuIn 0.2s ease-out",
        progress: "progress linear forwards",
        rise: "rise 0.9s cubic-bezier(0.22,1,0.36,1) both",
        fade: "fade 1s ease-out both",
        marquee: "marquee 45s linear infinite",
        sweep: "spin 4s linear infinite",
        ring: "ring 4.5s cubic-bezier(0.2,0.6,0.3,1) infinite",
      },
      keyframes: {
        scan: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(var(--scan-distance, 100%))" },
        },
        blink: {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        menuIn: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ring: {
          "0%": { transform: "scale(0.25)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        progress: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

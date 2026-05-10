import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        ink: "var(--text)",
        muted: "var(--text-muted)",
        primary: "var(--primary)",
        "primary-soft": "var(--primary-soft)",
        "primary-soft-text": "var(--primary-soft-text)",
        success: "var(--success)",
        "success-soft": "var(--success-soft)",
      },
      fontFamily: {
        sans: ["-apple-system", "system-ui", "Segoe UI", "Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

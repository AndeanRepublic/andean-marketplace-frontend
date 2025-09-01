import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        info: {
          100: "rgb(var(--base-info-100) / <alpha-value>)",
          200: "rgb(var(--base-info-200) / <alpha-value>)",
          300: "rgb(var(--base-info-300) / <alpha-value>)",
        },
        error: {
          100: "rgb(var(--base-error-100) / <alpha-value>)",
          200: "rgb(var(--base-error-200) / <alpha-value>)",
          300: "rgb(var(--base-error-300) / <alpha-value>)",
        },
        success: {
          400: "rgb(var(--base-success-400) / <alpha-value>)",
        },
        white: "rgb(var(--white) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
      },
      spacing: {
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "7xl": "var(--spacing-7xl)",
        "9xl": "var(--spacing-9xl)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;

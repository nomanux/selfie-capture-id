import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      colors: {
        // Brand colors
        // Values below are pulled directly from the Figma file's published
        // variables (NcMe5sSgPs65q3Ed2rV1Kv, "Colors/Brand" + component
        // colors) where available: 50 = Colors/Brand/50, 500 =
        // Colors/Text/text-brand-primary, 600 =
        // Components/Buttons/Primary/button-primary-bg, 700 =
        // Components/Breadcrumbs/breadcrumb-brand-fg_hover. The remaining
        // steps aren't published as variables, so they're kept as the
        // closest generated tint/shade.
        brand: {
          25: "#F0F5FF",
          50: "#d4e1fc",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#4c69f0",
          400: "#0a4de0",
          500: "#07389d",
          600: "#06318a",
          700: "#052b78",
          800: "#011e7e",
          900: "#010f4f",
          950: "#020b27",
        },
        // Gray colors
        gray: {
          25: "#fcfcfc",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030713",
        },
        // Success colors
        success: {
          25: "#f6fefc",
          50: "#f0fdf9",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
          950: "#051e16",
        },
        // Error colors
        error: {
          25: "#fefcfd",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#56080a",
        },
        // Warning colors
        warning: {
          25: "#fffaf2",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Blue colors
        blue: {
          25: "#f6fafe",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
          950: "#051e34",
        },
        // Green colors
        green: {
          25: "#f6fdf9",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
          950: "#051e16",
        },

        // Utility/component colors — semantic alias for `brand`, same ramp.
        primary: {
          25: "#faf8ff",
          50: "#d4e1fc",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#4c69f0",
          400: "#0a4de0",
          500: "#07389d",
          600: "#06318a",
          700: "#052b78",
          800: "#011e7e",
          900: "#010f4f",
        },
        secondary: {
          25: "#fcfcfc",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Neutral/disabled states
        disabled: "#d1d5db",
        // Reservation Agreement section colors
        reservation: {
          bg: "#deefe5",
          heading: "#067647",
        },
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "30px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
      },
      spacing: {
        "0": "0",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
      },
      // Standard, not-overly-rounded scale (matches the classic Tailwind
      // radii most admin UIs use) — was previously inflated (md 12px, lg
      // 16px, xl 20px), which made every card/button/input look noticeably
      // more rounded than a typical enterprise dashboard.
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "4px",
        base: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(10, 13, 18, 0.05)",
        sm: "0 1px 3px 0 rgba(10, 13, 18, 0.1), 0 1px 2px 0 rgba(10, 13, 18, 0.06)",
        md: "0 4px 6px -1px rgba(10, 13, 18, 0.1), 0 2px 4px -1px rgba(10, 13, 18, 0.06)",
        lg: "0 10px 15px -3px rgba(10, 13, 18, 0.1), 0 4px 6px -2px rgba(10, 13, 18, 0.05)",
        xl: "0 20px 25px -5px rgba(10, 13, 18, 0.1), 0 10px 10px -5px rgba(10, 13, 18, 0.04)",
        "2xl": "0 25px 50px -12px rgba(10, 13, 18, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

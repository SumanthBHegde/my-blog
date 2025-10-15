/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#166534", // Dark forest green
          foreground: "#ffffff", // White text
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Forest Theme Colors - Enhanced with better contrast
        forest: {
          50: "#f0fdf4", // Very light mint
          100: "#dcfce7", // Light mint
          200: "#bbf7d0", // Pale mint
          300: "#86efac", // Light sage green
          400: "#4ade80", // Bright sage
          500: "#22c55e", // Medium sage
          600: "#16a34a", // Forest sage
          700: "#15803d", // Deep forest
          800: "#166534", // Dark forest
          900: "#14532d", // Very dark forest
          950: "#052e16", // Ultra dark forest
        },
        earth: {
          50: "#f5f0e8", // Deep cream
          100: "#ede2d1", // Warm beige
          200: "#e0cdb4", // Light brown
          300: "#d1b894", // Medium brown
          400: "#b8a078", // Dark brown
          500: "#9b8565", // Very dark brown
          600: "#7d6a52", // Deep brown
          700: "#5f513f", // Ultra dark brown
          800: "#4a3c2f", // Rich dark brown
          900: "#3a2e24", // Deep earthy brown
          950: "#2a2119", // Ultra deep brown
        },
        // Legacy colors for backward compatibility
        dark: {
          light: "#64748b",
          hard: "#0f172a",
          soft: "#334155",
        },
      },
      borderColor: {
        // Override default border colors to use theme colors
        DEFAULT: "hsl(var(--border))",
        primary: "#166534", // Dark forest green
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        destructive: "hsl(var(--destructive))",
        // Forest theme border colors
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Earth theme border colors
        earth: {
          50: "#f5f0e8",
          100: "#ede2d1",
          200: "#e0cdb4",
          300: "#d1b894",
          400: "#b8a078",
          500: "#9b8565",
          600: "#7d6a52",
          700: "#5f513f",
          800: "#4a3c2f",
          900: "#3a2e24",
          950: "#2a2119",
        },
      },
      backgroundColor: {
        // Override default background colors to use theme colors
        DEFAULT: "hsl(var(--background))",
        primary: "#166534", // Dark forest green
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        destructive: "hsl(var(--destructive))",
        // Forest theme background colors
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Earth theme background colors
        earth: {
          50: "#f5f0e8",
          100: "#ede2d1",
          200: "#e0cdb4",
          300: "#d1b894",
          400: "#b8a078",
          500: "#9b8565",
          600: "#7d6a52",
          700: "#5f513f",
          800: "#4a3c2f",
          900: "#3a2e24",
          950: "#2a2119",
        },
      },
      textColor: {
        // Override default text colors to use theme colors
        DEFAULT: "hsl(var(--foreground))",
        primary: "#166534", // Dark forest green
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        // Forest theme text colors
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Earth theme text colors
        earth: {
          50: "#f5f0e8",
          100: "#ede2d1",
          200: "#e0cdb4",
          300: "#d1b894",
          400: "#b8a078",
          500: "#9b8565",
          600: "#7d6a52",
          700: "#5f513f",
          800: "#4a3c2f",
          900: "#3a2e24",
          950: "#2a2119",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        OpenSans: ["'Open Sans'", "sans-serif"],
        Roboto: ["'Roboto'", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // Custom plugin for additional utilities
    function ({ addUtilities }) {
      addUtilities({
        ".text-balance": {
          "text-wrap": "balance",
        },
      });
    },
  ],
};

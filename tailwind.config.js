/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        graphite: {
          950: "#08090b",
          900: "#0f1115",
          850: "#15181f",
          800: "#1e222b",
          750: "#242a35",
          700: "#2b323d",
        },
        steel: {
          600: "#3d4655",
          500: "#5d6b82",
          400: "#8b9bb4",
          300: "#b4c1d4",
          200: "#d2d9e4",
          100: "#e8edf5",
        },
        precision: {
          cyan: "#0ea5e9",
          blue: "#0284c7",
          glow: "rgba(14, 165, 233, 0.15)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "Syne", "sans-serif"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.1em",
        technical: "0.15em",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        "metallic-radial": "radial-gradient(circle at 50% 0%, rgba(30, 34, 43, 0.6) 0%, rgba(8, 9, 11, 1) 100%)",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        precision: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        "precision-hover": "0 0 0 1px rgba(14, 165, 233, 0.3), 0 8px 30px -4px rgba(14, 165, 233, 0.15)",
        "inner-metallic": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      height: {
        header: "var(--header-height)",
      },
      zIndex: {
        mobileMenu: "9999",
      },
    },
    screens: {
      tablet: "768px",
      laptop: "1440px",
      desktop: "1920px",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;

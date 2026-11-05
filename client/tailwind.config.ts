import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mongzo: {
          green: "#00ED64",
          greenDark: "#00B84E",
          dark: "#001E2B",
          mist: "#F9FBF9",
        },
      },
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        archivo: ["var(--font-archivo)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        "monte-carlo": ["var(--font-monte-carlo)", "cursive"],
      },
      screens: {
        "800px": "800px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
} satisfies Config;

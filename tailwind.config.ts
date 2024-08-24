/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        space: {
          dark: "#0f172a",
          light: "#f1f5f9",
          accent: "#60a5fa",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

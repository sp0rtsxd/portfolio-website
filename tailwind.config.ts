module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "space-black": "#0B0D17",
        "space-blue": "#1E2A45",
        "space-purple": "#3D1C7C",
        "space-pink": "#D53F8C",
        "space-white": "#F1F5F9",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};

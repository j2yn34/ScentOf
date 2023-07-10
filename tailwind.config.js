/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
    },
    extend: {
      colors: {
        beige: "#F6F3F0",
        "brown-200": "#E6D4C2",
        "brown-300": "#C2A788",
        "brown-400": "#9B8772",
        "brown-500": "#695C4F",
        "brown-600": "#504538",
        brown: "#3B3936",
        green: "06AC59",
        red: "FB3535",
      },
      width: {
        "arrowSize-sm": "8px",
      },
      height: {
        "arrowSize-sm": "8px",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};

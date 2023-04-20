/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      'rblue': "#89C4E1",
      'rorange': "#FFBE79",
      'dblue': "#243763",
      'dorange': "#FFB562",
    },
    extend: {},
  },
  plugins: [],
}
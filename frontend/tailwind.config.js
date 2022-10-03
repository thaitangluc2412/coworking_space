/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      bungee: ["Bungee", "sans-serif"],
    },
    colors: {
      primary: "#6a5af9",
      primaryHover: "#5748de",
      noColor: "transparent",
      white: "white",
      lightRed: "#e6a0db",
      grayLight: "#E7ECF3",
      gray: "rgb(100 116 139)",
    },

    extend: {},
  },
  plugins: [],
};

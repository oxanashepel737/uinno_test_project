/** @type {import("tailwindcss").Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "red-1": "#F40009",
        "red-2": "#9b2c2c",
        "red-3": "#f56565",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        toast: {
          "0%": { transform: "translateX(-100%)" },
          "20%": { transform: "translateX(0)" },
          "80%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        transform_toast: "toast 5s ease-in-out",
      },
    },
  },
  plugins: [],
};

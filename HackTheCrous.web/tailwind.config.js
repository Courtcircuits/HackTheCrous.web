/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    gradientColorStops: {
      limeGreen: "#6BF4A3",
      primary: "#1CEE71",
    },
    colors: {
      tint0: "rgb(12, 12, 12)",
      tint100: "#161616",
      tint200: "#1E1E1E",
      bgOff: "rgba(30,30,30,0.27)",
      tint900: "white",
      primary: "#1CEE71",
      warn: "#ff0000",
      orange: "#FFA500",
      offwhite: "rgba(255, 255, 255, 0.5)",
      fadedwhite: "rgba(255, 255, 255, 0.2)",
      slightwhite: "rgba(255, 255, 255, 0.1)",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Darker Grotesque", "sans-serif"],
      grotesk: ["VT323", "sans-serif"],
      clean: ["Inter", "sans-serif"],
    },
    borderRadius: {
      lg: "22px",
      full: "9999px",
    },
    extend: {
      borderWidth: {
        xs: "1px",
      },
    },
  },
  plugins: [],
};

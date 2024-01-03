/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      "primary": "#ffffff",
      "secondary": "#ffffff",
      "accent": "#24EE76",
      "neutral": "#BFBFBF",
      "base-100": "#0C0C0C",
      "half-tone": "#ffffff17",
      "info": "#6663F4",
      "success": "#04ff6a",
      "warning": "#FF3C3C",
      "error": "#FF3C3C",
      "transparent": "transparent",
    },
    fontFamily: {
      sans: ["Darker Grotesque", "sans-serif"],
      grotesk: ["VT323", "sans-serif"],
      clean: ["Inter", "sans-serif"],
    },
    extend: {
      borderWidth: {
        1: '0.5px'
      },
    },
    plugins: [],
  }
}

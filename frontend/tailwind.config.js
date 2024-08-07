/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBG: "#f7f7f7",
        primary: "#2e2d2d",
        theme: "#345e48" 
      }
    },
  },
  plugins: [],
}


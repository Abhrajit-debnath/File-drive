/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "secondary-font": ["Lato", "sans-serif"],
        "primary-font": ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}


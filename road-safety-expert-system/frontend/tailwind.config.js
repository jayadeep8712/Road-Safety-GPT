// In tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#1a202c',
        'brand-light': '#f7fafc',
        'brand-blue': '#2b6cb0',
        'brand-teal': '#319795',
      }
    },
  },
  plugins: [],
}
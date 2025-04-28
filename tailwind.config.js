/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add any custom colors here
      },
      backgroundImage: {
        'pokeball-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23000' stroke-width='2' fill='none'/%3E%3Cpath d='M50,10 v80 M10,50 h80' stroke='%23000' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='12' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E\")",
        'select-arrow': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
  important: true, // This ensures Tailwind styles take precedence
}
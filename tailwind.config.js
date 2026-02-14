/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        airbnb: '#FF385C',
        'airbnb-dark': '#d50027',
      }
    },
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'alfa-slab': ['"Alfa Slab One"', 'serif'],
        'inter': ['Inter', 'sans-serif'], // Adding Inter as an option
      },
    },
  },
  plugins: [],
}
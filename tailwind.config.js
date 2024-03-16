/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif']
      },
      colors: {
        'custom-gray': '#475467',
        'border-gray': '#D0D5DD'
      }
    }
  },
  plugins: []
}

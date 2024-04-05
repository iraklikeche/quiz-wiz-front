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
        'custom-light-gray': '#667085',
        'border-gray': '#D0D5DD',
        'custom-blue': '#4B69FD',
        'toast-green': '#01E17B',
        'toast-yellow': '#FFD21F',
        'toast-red': '#F04349'
      },
      keyframes: {
        progress: {
          '100%': {
            right: '100%'
          }
        }
      }
    }
  },
  plugins: []
}

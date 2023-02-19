/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
        'orange': {
            300: '#ff6900',
            400: '#fcb900',
        },
        'black': '#000000',
        'jet': '#363537',
        'white': '#FFFFFF',
        'yellow': '#f4C717',
        'green': '#33CA7F',
        'red': '#Ef2D56',
        'purple': '#5F4BB6',
        'blue': '86A5D9',
        'inherit': 'inherit',
    },
    fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Nunito', 'serif'],
        title: [ '"Berkshire Swash"'],
    },
    extend: {},
  },
  plugins: [],
}

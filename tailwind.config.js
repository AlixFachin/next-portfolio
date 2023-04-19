/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
        'orange': {
            200: '#C75300',
            300: '#ff6900',
            400: '#fcb900',
        },
        'black': '#000000',
        'darkgrey': {
            200: '#444444',
            300: '#666666' },
        'grey': '#00000010',
        'jet': '#363537',
        'white': '#FFFFFF',
        'yellow': '#f4C717',
        'green': '#33CA7F',
        'red': '#Ef2D56',
        'purple': '#5F4BB6',
        'blue': {
            200: '#86A5D9',
            300: '#0496FF',
            400: '#006BA6',
        },
        'inherit': 'inherit',
        'transparent': '#FFFFFF00'
    },
    fontFamily: {
        primary: ['Noto Sans', ...fontFamily.sans],
        sans: [ 'Noto Sans', 'var(--font-source-code-pro)', 'Lato', 'sans-serif'],
        title: [ 'var(--font-title)'],
        headers: ['var(--font-noto-sans)', ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

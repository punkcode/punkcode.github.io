const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: true,
    content: ['./_site/**/*.html'],
  },
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        penguin: {
          orange: '#fb4901',
          tan: '#fdfbd2',
          black: '#1c211d',
        },
      },
      fontFamily: {
        bowlby: ['Bowlby One SC', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

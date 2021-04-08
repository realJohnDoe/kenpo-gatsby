const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [`${__dirname}/src/**/*.{js,jsx,ts,tsx}`],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        refBlockLight: '#f1f5f9',
        refBlockDark: '#161b21',
        ...colors,
      },
      typography: {
        DEFAULT: {
          css: {
            color: null,
            a: null,
            h1: {
              color: null,
            },
            h2: {
              color: null,
            },
            h3: {
              color: null,
            },
            'ol > li::before': {
              color: null,
            },
            'ul > li::before': {
              backgroundColor: null,
            },
            code: null,
            pre: null,
          },
        },
        sm: {
          css: {
            'thead th:first-child': null,
            'thead th:last-child': null,
            'tbody td:first-child': null,
            'tbody td:last-child': null,
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

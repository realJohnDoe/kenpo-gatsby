const colors = require('tailwindcss/colors');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

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
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          link: withOpacity('--color-text-link'),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--color-background-base'),
          header: withOpacity('--color-background-header'),
          popover: withOpacity('--color-background-popover'),
          'popover-hover': withOpacity('--color-background-popover-hover'),
        },
      },
      borderColor: {
        skin: {
          base: withOpacity('--color-border-base'),
        },
      },
      ringColor: {
        skin: {
          base: withOpacity('--color-ring-base'),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

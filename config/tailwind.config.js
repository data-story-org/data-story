const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/components/**/*.tsx',
    './src/components/**/*.jsx',
    './public/**/*.html',
  ],
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'IBM Plex Sans',
        ...defaultTheme.fontFamily.sans,
      ],
      serif: [
        'IBM Plex Serif',
        ...defaultTheme.fontFamily.serif,
      ],
      mono: [
        'IBM Plex Mono',
        ...defaultTheme.fontFamily.mono,
      ],
    },
    extend: {
      colors: {
        malibu: {
          500: '#61dafb',
          600: '#52B8D2',
          700: '#4499AF',
          800: '#32879d',
          900: '#1b7086',
        },
      },
      fontSize: {
        xxs: '.65rem',
      },
      height: (theme) => ({
        '85vh': '85vh',
      }),
    },
  },
  variants: {
    extend: {
      textTransform: ['hover', 'focus'],
    },
  },
  plugins: [],
};

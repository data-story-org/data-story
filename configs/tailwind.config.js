module.exports = {
  purge: [
    './src/components/**/*.tsx',
    './src/components/**/*.jsx',
    './src/sections/**/*.jsx',
    './src/sections/**/*.tsx',
    './src/lib/styles/**/*.ts',
    './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // Remove font settings so they
        // won't be forced globally,
        // and therefore gui can be used
        // as widget in other apps
        sans: [''],
        serif: [''],
        mono: [''],
      },
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

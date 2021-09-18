module.exports = {
  purge: [],
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'brand': '0 1px 0 #091e4240;'
      },
      zIndex: {
        '-10': '-10',
      },
      colors: {
        "brand": {
          'violet': "#EAE6FF",
          'blue': "#0065FF",
        }
      },
      minWidth: {
        xs: '20rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};

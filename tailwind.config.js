module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#4456B7',
      secondary: '#CCF74A',
      black: '#000',
      white: '#fff',
      transparent: '#00000000',
      'light-gray': '#B3B3B3',
      'transp-gray': 'rgba(88, 88, 88, 0.9)',
      'selected': 'rgba(144, 144, 144, 0.9)',
      'selected2': "#030D16",
      'navy': '#182028',
    },
    spacing: {
      '0': '0rem',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1.0rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2.0rem',
      '10': '2.5rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '18': '4.5rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '30': '7.5rem',
      '32': '8rem',
      '36': '9rem',
      '38': '9.5rem',
      '40': '10rem',
      '44': '11rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '68': '17rem',
      '70': '17.5rem',
      '72': '18rem',
      '80': '20rem',
      // '1/20': '5%',
      // '1/10': '10%',
      // '3/20': '15%',
      // '3/10': '30%',
      // '7/20': '35%',
      // '9/20': '45%',
      // '11/20': '55%',
      // '13/20': '65%',
      // '14/20': '65%',
    },
    extend: {
      minWidth: {
        '0': '0rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1.0rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '14': '3.5rem',
        '1/4': '25%',
        '1/5': '20%',
      },
      maxWidth: {
        '0': '0rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1.0rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '14': '3.5rem',
        '1/4': '25%',
        '1/5': '20%',
      },
      // [fontSize, lineHeight]
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
        '3xs': ['0.5rem', '0.5rem'],
      },
      borderRadius: {
        'none': '0',
        'sm': '.125rem',
        'md': '.375rem',
        'lg': '.5rem',
        'xl': '.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  variants: {
    margin: ['last'],
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}

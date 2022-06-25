module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#EF454A',
      secondary: '#CCF74A',
      black: '#000',
      white: '#fff',
      transparent: '#00000000',
      'light-gray': '#B3B3B3',
      'transp-gray': 'rgba(88, 88, 88, 0.9)',
    },
    spacing: {
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
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '30': '7.5rem',
      '32': '8rem',
      '36': '9rem',
      '38': '9.5rem',
      '40': '10rem',
      '44': '11rem',
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
    // fontSize: {
    // },
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
    extend: {
      // backgroundImage: {
      //   'dumbbell@iphone': "url('/assets/background/dumbbell@iphone.jpg')",
      //   'dumbbell2@iphone': "url('/assets/background/dumbbell2@iphone.jpg')",
      //   'dumbbell3@iphone': "url('/assets/background/dumbbell3@iphone.jpg')",
      //   'lake@iphone': "url('/assets/background/lake@iphone.jpg')",
      //   'leaf@iphone': "url('/assets/background/leaf@iphone.jpg')",
      //   'sea@iphone': "url('/assets/background/sea@iphone.jpg')",
      //   'starrysky@iphone': "url('/assets/background/starrysky@iphone.jpg')",
      //   'trainingroom@iphone': "url('/assets/background/trainingroom@iphone.jpg')",
      //   'water@iphone': "url('/assets/background/water@iphone.jpg')",
      //   'water2@iphone': "url('/assets/background/water2@iphone.jpg')",
      // },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}

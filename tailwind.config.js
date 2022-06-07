module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#EF454A',
      black: '#000',
      white: '#fff',
      transparent: '#00000000'
    },
    spacing: {
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1.0rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2.0rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        montserratLight: 'Montserrat-Light',
        montserratLightItalic: 'Montserrat-LightItalic',
        montserrat: 'Montserrat-Regular',
        montserratItalic: 'Montserrat-Italic',
        montserratMedium: 'Montserrat-Medium',
        montserratSemiBold: 'Montserrat-SemiBold',
        montserratBold: 'Montserrat-Bold',
      },
    },
  },
  plugins: [],
};

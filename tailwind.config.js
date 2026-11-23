import he from './app/img/Home.svg'

const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      backgroundImage: {
        'home_bg_image' : "url('../app/img/Home.svg')",
      },
      colors: {
        Blue: '#418FF5',
        darkBlue: '#2B72D9',
        LightBlue: '#8EC1FF',
        Red: '#f32e2e',
        LightRed: '#f32e2e54',
        White: '#F1F2F6',
        LightGray: '#F1F2F6',
        SupLightBlue: '#E8F1FE',
        Gray: '#808080',
        Muted: '#6F8098',
        Ink: '#292929',
        Navy: '#0B1A30',
        Success: '#34D399',
        Highlight: '#FFB547',
        "border-gray": "#e6e6e6",
        "hover-gray": "#ebebeb",
        "transparent-black-50": "rgb(0 0 0 / 40%)",
        "transparent-black-10": "rgba(241, 241, 241, 0.723)",
      },
      keyframes: {
        collapse: {
          '0%': { height: '64px' },
          '100%': { height: '0px' },
        },
      },
      animation: {
        'collapse': 'collapse 1s ease-in-out',
      }
    },
  },
  plugins: [],
}

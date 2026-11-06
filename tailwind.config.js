/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#000000',
          900: '#050507',
          850: '#08080a',
          800: '#0c0c10',
          700: '#130709',
        },
        crimson: {
          400: '#ff4242',
          500: '#ff2b2b',
          600: '#dd2222',
          700: '#990d0d',
          800: '#7a0e0e',
          900: '#5e0a0a',
          950: '#240404',
        },
        bone: {
          100: '#ffe8e8',
          200: '#ffe0e0',
          300: '#ededf0',
          400: '#d8d8dc',
        },
      },
    },
  },
  plugins: [],
};


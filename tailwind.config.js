/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 VERY IMPORTANT
  safelist: [
    'dark',
  ],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
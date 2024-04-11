/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        buttonColor: '#9747ff',
      },
    },
  },
  // plugins: [require('daisyui')],
};

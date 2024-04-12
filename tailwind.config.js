/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      backgroundColor: {
        // Ajoute ton nouveau background color ici
        'custom-purple': '#9747ff',
        // 'custom-gradient': 'linear-gradient(70deg, #141314 1%, #371b4b 100%)',
      },
    },
  },
  plugins: [],

};

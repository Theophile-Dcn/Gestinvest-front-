/** @type {import('tailwindcss').Config} */

// tailwind.config.js

module.exports = {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        // Ajoute ton nouveau background color ici
        'custom-purple': '#9747ff',
        // 'custom-gradient': 'linear-gradient(70deg, #141314 1%, #371b4b 100%)',
      },
      colors: {
        buttonColor: '#9747ff',
        backgroundColorModal: '#371b4b',
      },
      animation: {
        // Définition de l'animation avec une durée de 1s et une répétition pendant 10s
        bounce: 'bounceVariant 1s infinite',
      },
      keyframes: {
        bounceVariant: {
          '0%, 100%': {
            transform: 'translateY(0%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-2%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
};

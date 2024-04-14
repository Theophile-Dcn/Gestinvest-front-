module.exports = {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-purple': '#9747ff',
      },
      colors: {
        buttonColor: '#9747ff',
        backgroundColorModal: '#371b4b',
      },
      animation: {
        // Ajout des deux animations
        bounce: 'bounceVariant 2s infinite',
        spin: 'spin 6s linear infinite',
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
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
};

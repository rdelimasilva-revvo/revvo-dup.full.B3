/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'revvo-blue': '#0070f2',
        'revvo-dark-blue': '#162D60',
        'gray-2': '#E5E7EB',
        'gray-3': '#9CA3AF',
        'error': '#DC2626'
      },
      height: {
        'input': '48px'
      },
      fontFamily: {
        'sans': ['Onest', 'sans-serif'],
        'onest': ['Onest', 'sans-serif']
      },
      backgroundImage: {
        'gradient-left': 'linear-gradient(to bottom, #043D7F, #131E2E)'
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

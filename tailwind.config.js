/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold': {
          light: '#d4c589',
          DEFAULT: '#C2B280',
          dark: '#a69660',
        },
        'beige': {
          light: '#F9F6EC',
          DEFAULT: '#F6F1E1',
          dark: '#EAE0C7',
        },
        'noir': {
          light: '#444444',
          DEFAULT: '#191919',
          dark: '#000000',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 4px 12px rgba(194, 178, 128, 0.2)',
        'gold': '0 10px 25px rgba(194, 178, 128, 0.25)',
        'gold-lg': '0 20px 40px rgba(194, 178, 128, 0.3)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideUp: 'slideUp 1s ease-out forwards',
        pulse: 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

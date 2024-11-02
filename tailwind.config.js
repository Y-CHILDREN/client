/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s forwards',
        fadeOut: 'fadeOut 1s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        brightness: {
          0: '0%',
          50: '50%',
          75: '75%',
          100: '100%',
          125: '125%',
          150: '150%',
          200: '200%',
        },
      },
    },
  },
  plugins: [],
};

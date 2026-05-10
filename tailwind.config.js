/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'super-float': 'super-float 5s ease-in-out infinite',
      },
      keyframes: {
        'super-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-35px) rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
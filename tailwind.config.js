/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        slide1: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(-200%)' },
        },
        slide2: {
          '0%': { transform: 'translateX(100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slide3: {
          '0%': { transform: 'translateX(200%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        animation: {
            slide1: 'slide1 5s ease-in-out infinite',
            slide2: 'slide2 5s ease-in-out infinite',
            slide3: 'slide3 5s ease-in-out infinite',
          },
        
      }
    },
  },
  plugins: [],
}

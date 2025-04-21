/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            keyframes: {
                colorSlide: {
                  '0%': { color: '#ec4899', transform: 'translateX(100%)' }, // pink-500
                  '50%': { color: '#3b82f6', transform: 'translateX(0%)' },   // blue-500
                  '100%': { color: '#ec4899', transform: 'translateX(-100%)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '200% center' },
                    '50%': { backgroundPosition: '0% center' },
                  },
              },
              animation: {
                colorSlide: 'colorSlide 3s ease-in-out infinite',
                gradient: 'gradient 4s ease infinite',
              },        
        },
    },
    plugins: [require("daisyui")],
};
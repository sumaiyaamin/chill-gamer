/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          // Add your custom theme extensions here
          colors: {
              primary: {
                  DEFAULT: '#1a1c2e', // Dark mode primary color
                  light: '#ffffff', // Light mode primary color
              },
              // Add more custom colors as needed
          },
          
      },
  },
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },

  variants: {
      extend: {
          backgroundColor: ['dark', 'light'], 
          textColor: ['dark', 'light'], 
          borderColor: ['dark', 'light'], 
      },
  },
  plugins: [
      require('daisyui'), 
      require('@tailwindcss/aspect-ratio'),
  ],
};


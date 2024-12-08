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
  variants: {
      extend: {
          backgroundColor: ['dark', 'light'], // Extend background color variants
          textColor: ['dark', 'light'], // Extend text color variants
          borderColor: ['dark', 'light'], // Extend border color variants
      },
  },
  plugins: [
      require('daisyui'), 
      require('@tailwindcss/aspect-ratio'),
  ],
};


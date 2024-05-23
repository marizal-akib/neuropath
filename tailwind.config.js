/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008080',
        secondary: '#20B2AA',
        accent: '#005F5F',
        base: '#FFFFFF',
        'secondary-bg': '#F5F5F5',
        'text-primary': '#333333',
        'text-secondary': '#666666',
        border: '#E0E0E0',
      },
    },
  },
  plugins: [],
}


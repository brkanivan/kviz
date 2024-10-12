/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',

  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF', // Možeš promijeniti na željenu boju
        'secondary': '#93C5FD',
        'accent': '#22D3EE'
      }
    },
  },
  plugins: [],
}


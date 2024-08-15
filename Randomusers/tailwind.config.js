/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hidden': {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none', /* Firefox */
          },
          '.scrollbar-hidden::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari */
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}
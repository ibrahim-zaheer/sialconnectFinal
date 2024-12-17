/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'google-gradient': 'linear-gradient(90deg, #4285F4 0%, #34A853 25%, #FBBC05 50%, #EA4335 100%)',
      },
    },
  },
  plugins: [],
};

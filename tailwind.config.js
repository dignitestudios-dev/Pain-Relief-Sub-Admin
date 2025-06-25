// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'sans-serif'], // Adding General Sans as the default sans-serif font
      },
    },
  },
  plugins: [],
};

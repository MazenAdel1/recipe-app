/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#11181b",
        "dark-blue": "#1B262C",
        "mid-blue": "#0F4C75",
        "light-blue": "#3282B8",
      },
      backgroundColor: {
        dark: "#11181b",
        "dark-blue": "#1B262C",
        "mid-blue": "#0F4C75",
        "light-blue": "#3282B8",
      },
    },
  },
  plugins: [],
};

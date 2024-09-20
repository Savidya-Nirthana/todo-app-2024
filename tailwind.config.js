/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    "./components/Hellow.{js,jsx,ts,tsx}",
    "./components/DateTime.{js,jsx,ts,tsx}",
    "./components/TodoList.{js,jsx,ts,tsx}",
    "./components/TodoItem.{js,jsx,ts,tsx}",
    "./components/GetItems.{js,jsx,ts,tsx}",
    "./components/Priorities.{js,jsx,ts,tsx}",
    "./components/SearchBar.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

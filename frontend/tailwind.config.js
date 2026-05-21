/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        plantation: {

          dark: "#0b3d0b",

          green: "#1f7a1f",

          light: "#dff5df"
        }
      },

      backdropBlur: {

        xs: "2px"
      }
    },
  },

  plugins: [],
};
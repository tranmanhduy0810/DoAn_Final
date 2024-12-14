/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage:{
        'bg-login': 'url("../images/backgroundlogin.png")'
      }
    },
  },
  plugins: [],
}
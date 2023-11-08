module.exports = {
  content: {
    files: ["*.html", "./src/**/*.rs"],
  },
  plugins: [require("daisyui")],
  theme: {
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',
      'lg-max': {'max': '1023px'},

      'xl': '1280px',

      '2xl': '1536px',
    }
  },
};

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "media-list": "repeat(auto-fill, 9rem)",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
    },
  },
  plugins: [],
};

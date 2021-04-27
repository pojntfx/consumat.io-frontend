module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "media-list": "repeat(auto-fill, 9rem)",
      },
      height: {
        29: "7.25rem",
        "line-base-3": "4.5rem",
        "line-sm-3": "3.75rem",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

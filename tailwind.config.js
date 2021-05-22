module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        "media-list": "repeat(auto-fill, 8rem)",
      },
      width: {
        "7/10": "70%",
        "29/100": "29%",
      },
      height: {
        29: "7.25rem",
        "line-base-3": "4.5rem",
        "line-sm-3": "3.75rem",
      },
      margin: {
        "1/100": "1%",
      },
      boxShadow: {
        DEFAULT: "0px 1px 8px rgba(0, 0, 0, 0.10)",
        md: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        none: "none",
      },
    },
  },
  variants: {
    extend: {
      fill: ["hover"],
      boxShadow: ["active"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

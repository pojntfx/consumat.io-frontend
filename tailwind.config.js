module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      scale: {
        99: ".99",
        101: "1.01",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      gridTemplateColumns: {
        "media-list-mobile": "repeat(auto-fill, 6rem)",
        "media-list": "repeat(auto-fill, 8rem)",
      },
      width: {
        "8/25": "32%",
        "29/100": "29%",
        "12/25": "48%",
        "7/10": "70%",
      },
      height: {
        22: "5.5rem",
        23: "5.75rem",
        29: "7.25rem",
        30: "7.5rem",
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

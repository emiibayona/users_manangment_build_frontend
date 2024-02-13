/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
  ],
  theme: {
    extend: {
      height: {
        "small-fit": "30px",
      },
      gap: {
        22: "5.25rem",
      },
      gridTemplateColumns: {
        "2s": "repeat(2, minmax(0, 320px))",
      },
      screens: {
        sms: { max: "780px" },
      },
      fontSize: {
        "form-label": [
          "20px",
          {
            lineHeight: "27px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
            color: "26355C",
          },
        ],
      },
    },
    colors: {
      purple: "#9378FF",
      "purple-dark": "#7F5FFF",
      "light-pink": "#FBEEFF",
      "darker-pink": "#F0BEFF",
      grey: "#99879D",
      "grey-1": "#EBEBEB",
      "near-black": "#120E21",
      "red-error": "#FF7979",
      "pulse-off": "#475569",
      "pulse-on": "#64748b",
    },
  },
  plugins: [],
};

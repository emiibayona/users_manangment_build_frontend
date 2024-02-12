/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
  ],
  theme: {
    extend: {
      gap: {
        22: "5.25rem",
      },
      gridTemplateColumns: {
        "3s": "repeat(3, minmax(0, 320px))",
      },
      screens: {
        sms: { max: "780px" },
      },
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
    colors: {
      purple: "#9378FF",
      "purple-dark": "#7F5FFF",
      "light-pink": "#FBEEFF",
      "darker-pink": "#F0BEFF",
      grey: "#99879D",
      "near-black": "#120E21",
    },
  },
  plugins: [],
};

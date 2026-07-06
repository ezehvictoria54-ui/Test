/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pine: "#16342A",
        "pine-deep": "#0D211A",
        stone: "#EDE7DB",
        "stone-soft": "#E2D9C9",
        bone: "#F6F2EA",
        brass: "#AE8747",
        "brass-bright": "#C9A25E",
        ink: "#1D231E",
        sage: "#7C8B77",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Jost"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        brass: "2px",
      },
      letterSpacing: {
        label: "0.22em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

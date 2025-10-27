// tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "bounce-width": {
          "0%": { transform: "translateX(0%) scaleX(0.6)" },
          "25%": { transform: "translateX(100%) scaleX(1.2)" },
          "50%": { transform: "translateX(0%) scaleX(0.6)" },
          "75%": { transform: "translateX(-100%) scaleX(1.2)" },
          "100%": { transform: "translateX(0%) scaleX(0.6)" },
        },
      },
      animation: {
        "bounce-width": "bounce-width 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

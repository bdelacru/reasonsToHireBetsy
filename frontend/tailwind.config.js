export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
      colors: {
        betsy: {
          purple: '#6D28D9',
          pink: '#F472B6',
          yellow: '#FACC15',
        },
      },
    },
  },
  plugins: [],
}

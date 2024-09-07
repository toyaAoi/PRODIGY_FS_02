/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.3s ease-in",
        popup: "popup 0.2s ease-in",
        notify: "notify 5s ease-in",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        popup: {
          "0%": {
            transform: "scale(0.9)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        notify: {
          "0%": {
            transform: "translateY(0)",
            opacity: 0,
          },
          "3%": {
            opacity: 1,
            transform: "translateY(-30%)",
          },
          "97%": {
            transform: "translateY(-30%)",
            opacity: 1,
          },

          "100%": {
            transform: "translateY(0)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};

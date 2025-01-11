/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        ca: "rgba(var(--ca))",
        cb: "rgba(var(--cb))",
        cc: "rgba(var(--cc))",
        cd: "rgba(var(--cd))",
        ce: "rgba(var(--ce))",
        black: "rgba(var(--black))",
        white: "rgba(var(--white))",
      },
    },
  },
  plugins: [scrollbar],
};

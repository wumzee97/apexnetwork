/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        "text-dark": "#111827",
        "light-purple": "#718096",
      },
      colors: {
        primary: "#0CAF60",
        info: "#8C62FF",
        warning: "#FE964A",
        error: "#FD6A6A",
        "tab-color": "#797B89",
        "content-secondary": "#88888A",
        "content-header": "#111216",
        "content-body": "#383A47",
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
};

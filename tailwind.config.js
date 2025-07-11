/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "linear-0": "linear-gradient(0deg, var(--tw-gradient-stops))",
        "linear-90": "linear-gradient(90deg, var(--tw-gradient-stops))",
        gold: "linear-gradient(180deg, #F3D444 0%, #FFD200 100%)",
        goldReverse: "linear-gradient(180deg, #F3D444 0%, #8D7B27 100%)",
      },
      boxShadow: {
        custom: "0 4px 18.1px 0 rgba(243,212,68,0.4)",
        drop: "0 3.22px 14.58px 0 rgba(243,212,68,0.4)",
      },
    },
  },
  plugins: [],
};

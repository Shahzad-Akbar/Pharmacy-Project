import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077B6",  //bg-blue-700
        secondary: "#0096C7",  //bg-sky-600
        background: "#F8F9FA",
        textPrimary: "#023E8A",
        success: "#2ECC71",
        warning: "#F4A261",
        danger: "#E63946",
        footer: "#343A40",
      },
    },
  },
  plugins: [],
};

export default config;
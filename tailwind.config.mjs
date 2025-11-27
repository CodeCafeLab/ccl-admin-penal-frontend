/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "#181a20",
        card: "#23272f",
        accent: "#ffd600",
        border: "#333843",
        foreground: "#f5f6fa",
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;

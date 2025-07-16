// PATH: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#E2725B',
          dark: '#C85A42',
          light: '#F0937C',
        },
        stone: {
          DEFAULT: '#B2B2B2',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#C3C3C3',
          500: '#B2B2B2',
          600: '#999999',
          700: '#737373',
          800: '#525252',
          900: '#404040',
        },
        sea: {
          DEFAULT: '#6495ED',
          dark: '#4A7FDB',
          light: '#85AEFF',
        },
        olive: {
          DEFAULT: '#808000',
          dark: '#666600',
          light: '#999900',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        opensans: ['var(--font-opensans)', 'Open Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

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
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
        // Purple Spectrum - Primary Brand Color
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Emerald Spectrum - Secondary Brand Color
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Gray Spectrum - Neutral Palette
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Status Colors
        success: '#059669',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        // Keep legacy colors for migration period (can remove later)
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
        // Brand fonts
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        // Legacy mappings
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        opensans: ['Open Sans', 'sans-serif'], // Can phase out
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Brand type scale
        '6xl': '3.75rem',    // 60px
        '5xl': '3rem',       // 48px
        '4xl': '2.25rem',    // 36px
        '3xl': '1.875rem',   // 30px
        '2xl': '1.5rem',     // 24px
        'xl': '1.25rem',     // 20px
        'lg': '1.125rem',    // 18px
        'base': '1rem',      // 16px
        'sm': '0.875rem',    // 14px
        'xs': '0.75rem',     // 12px
      },
      spacing: {
        // Brand spacing scale
        'xs': '0.5rem',      // 8px
        'sm': '1rem',        // 16px
        'md': '1.5rem',      // 24px
        'lg': '2rem',        // 32px
        'xl': '3rem',        // 48px
        '2xl': '4rem',       // 64px
        '3xl': '6rem',       // 96px
      },
      borderRadius: {
        // Brand radius system
        'sm': '0.5rem',      // 8px
        'md': '0.75rem',     // 12px
        'lg': '1rem',        // 16px
        'xl': '1.5rem',      // 24px
        '2xl': '2rem',       // 32px
        '3xl': '3rem',       // 48px
        'full': '9999px',
      },
      backgroundImage: {
        // Brand gradients
        'gradient-primary': 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
        'gradient-accent': 'linear-gradient(135deg, #9333ea 0%, #16a34a 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        // Brand shadows
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03), 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        'soft-xl': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.04), 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 40px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      animation: {
        // Brand animations
        'gradient-shift': 'gradientShift 15s ease infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        // Brand timing functions
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;

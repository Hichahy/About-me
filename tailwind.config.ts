import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        levitate: {
          '0%, 100%': { transform: 'translateY(-40px)' },
          '50%': { transform: 'translateY(40px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        levitate: 'levitate 30s ease-in-out infinite',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;

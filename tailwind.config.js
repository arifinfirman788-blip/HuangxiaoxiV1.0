/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#F8FAFC',
        'brand-mint': '#E0F2F1',
        'brand-blue': '#E1F5FE',
        'brand-text': '#334155',
        'glass-bg': 'rgba(255, 255, 255, 0.7)',
        'glass-border': 'rgba(255, 255, 255, 0.5)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'blob-1': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'blob-2': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'blob-3': '40% 60% 60% 40% / 60% 30% 70% 40%',
        'blob-card': '24px 24px 24px 8px',
        'blob-btn': '12px 24px 12px 24px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
        'float': '0 10px 30px -10px rgba(0,0,0,0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        razor: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          cardHover: '#F1F5F9',
          navy: '#0C2340',
          blue: '#0052FF',
          blueHover: '#0043D6',
          sky: '#0284C7',
          emerald: '#059669',
          amber: '#D97706',
          red: '#DC2626',
          border: '#E2E8F0',
          borderSubtle: '#F1F5F9',
          textMain: '#0F172A',
          textMuted: '#475569'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        guard: {
          bg: '#121212',
          card: '#1E1E1E',
          cardSoft: '#262626',
          emerald: '#10B981',
          coral: '#EF4444',
          text: '#F7F7F7',
          muted: '#A3A3A3'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0, 0, 0, 0.32)'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Segoe UI',
          'sans-serif'
        ],
        arabic: ['Tajawal', 'Cairo', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};

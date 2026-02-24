/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        statut: {
          pending: '#fef3c7',
          rh: '#dbeafe',
          tech: '#ede9fe',
          accepted: '#d1fae5',
          rejected: '#fee2e2',
        },
        success: {
          bg: '#d1fae5',
          text: '#065f46',
          border: '#6ee7b7'
        },
        warning: {
          bg: '#fef3c7',
          text: '#92400e',
          border: '#fcd34d'
        },
        danger: {
          bg: '#fee2e2',
          text: '#991b1b',
          border: '#fca5a5'
        },
        info: {
          bg: '#dbeafe',
          text: '#1e40af',
          border: '#93c5fd'
        }
      },
      spacing: {
        'section': '2rem',
        'card': '1.5rem',
        'element': '1rem',
        'compact': '0.5rem'
      },
      borderRadius: {
        'card': '1rem',
        'button': '0.5rem',
        'input': '0.5rem',
        'badge': '9999px'
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'modal': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
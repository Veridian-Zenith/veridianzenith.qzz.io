/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nordic Amber/Gold Color Palette
        amber: {
          50: '#FFF8DC',
          100: '#FFF2CC',
          300: '#FFDB8A',
          500: '#FFB347',
          600: '#FFA500',
          700: '#FF8C00',
          800: '#CC7000',
          900: '#995400',
          950: '#4A2B00',
        },
        gold: {
          100: '#FFF8DC',
          300: '#FFD700',
          500: '#FFD700',
          700: '#B8860B',
          900: '#8B6914',
        },
        bronze: {
          100: '#F4E4BC',
          300: '#CD7F32',
          500: '#CD7F32',
          700: '#A0522D',
          900: '#8B4513',
        },
        copper: {
          100: '#F7E7CE',
          300: '#B87333',
          500: '#B87333',
          700: '#8B4513',
          900: '#654321',
        },
      },
      fontFamily: {
        'display': ['Inter', 'SF Pro Display', 'sans-serif'],
        'body': ['Inter', 'SF Pro Text', 'sans-serif'],
        'mystical': ['Cinzel', 'Trajan Pro', 'Noto Sans Runic', 'Segoe UI Symbol', 'Arial Unicode MS', 'Lucida Grande', 'Code2000', 'Symbola', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float-rune': 'floatRune 6s ease-in-out infinite',
        'rune-glow': 'runeGlow 3s ease-in-out infinite alternate',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        floatRune: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '25%': {
            transform: 'translateY(-10px) rotate(1deg)',
          },
          '50%': {
            transform: 'translateY(-5px) rotate(0deg)',
          },
          '75%': {
            transform: 'translateY(-8px) rotate(-1deg)',
          },
        },
        runeGlow: {
          '0%': {
            textShadow: '0 0 10px rgba(255, 179, 71, 0.3)',
          },
          '100%': {
            textShadow: '0 0 20px rgba(255, 179, 71, 0.6), 0 0 30px rgba(255, 179, 71, 0.3)',
          },
        },
        particleFloat: {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
          },
          '33%': {
            transform: 'translateY(-20px) translateX(10px)',
          },
          '66%': {
            transform: 'translateY(10px) translateX(-5px)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mystical-gradient': 'linear-gradient(135deg, #1A1816 0%, #2A2824 50%, #1A1816 100%)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          brown: '#8B7355',
          brownDark: '#6B573E',
          brownLight: '#A0826D',
          beige: '#F5E6D3',
          beigeLight: '#FAF3EB',
          cream: '#FFFAF0',
          offwhite: '#FAFAF8',
          gold: '#C5A059',
          goldLight: '#DFBE82',
          copper: '#B87333',
          dark: '#2D2D2D',
          muted: '#666666',
          border: '#E8DCCF',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        luxury: '0 10px 30px -5px rgba(139, 115, 85, 0.12), 0 4px 6px -2px rgba(139, 115, 85, 0.05)',
        'luxury-hover': '0 20px 40px -10px rgba(139, 115, 85, 0.22), 0 8px 12px -3px rgba(139, 115, 85, 0.1)',
        glow: '0 0 25px rgba(197, 160, 89, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C5A059 0%, #DFBE82 50%, #B87333 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #8B7355 0%, #A0826D 100%)',
        'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FFFAF0 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        organic: '2.5rem 1rem 2.5rem 1rem',
      },
    },
  },
  plugins: [],
};

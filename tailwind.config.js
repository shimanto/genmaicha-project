/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 焙煎玄米の色調: 焦げ茶・琥珀・新芽緑
        brand: {
          50: '#fdf8f1',
          100: '#faeedb',
          200: '#f4dbb0',
          300: '#e8bd78',
          400: '#d99a46',
          500: '#c17d28',
          600: '#a4621e',
          700: '#814a1b',
          800: '#603619',
          900: '#3d220f',
        },
        // 新芽・茶葉のアクセント
        matcha: {
          400: '#6f8f3f',
          500: '#577730',
          600: '#445e25',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          'Hiragino Sans',
          'Hiragino Kaku Gothic ProN',
          'Meiryo',
          'sans-serif',
        ],
        serif: [
          '"Noto Serif JP"',
          'Hiragino Mincho ProN',
          'YuMincho',
          'serif',
        ],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 焙煎玄米の琥珀色 (kohaku) をブランドカラーに
        brand: {
          50: '#fdf8f0',
          100: '#faeed8',
          200: '#f3d8aa',
          300: '#e9bb74',
          400: '#dc9a47',
          500: '#cf7e2a', // 中間焙煎
          600: '#b96420', // 標準
          700: '#964c1c', // 深煎り
          800: '#79401d',
          900: '#603419',
          950: '#341a09',
        },
        // 抹茶緑のアクセント (matcha)
        matcha: {
          50: '#f3f7ec',
          100: '#e3edd2',
          300: '#bcd384',
          500: '#7d9c46',
          600: '#608035',
          700: '#4a652d',
          900: '#2c3d1c',
        },
        // 紙のクリーム色
        washi: {
          50: '#fdfaf3',
          100: '#faf4e5',
          200: '#f4ebd0',
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
          '"Shippori Mincho"',
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

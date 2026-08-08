/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        ink2: '#14120f',
        accent: '#1ab8e8',
        accentDeep: '#0f9fcf',
        surface: '#f8f7f5',
        surface2: '#f0efe9',
        line: '#e2e0d8',
        muted: '#6b6960',
        faint: '#9b9a94',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: { xl2: '14px' },
    },
  },
  plugins: [],
}

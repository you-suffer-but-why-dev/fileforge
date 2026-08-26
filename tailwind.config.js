/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0B',
        surface: '#121214',
        surface2: '#1A1A1D',
        brand: '#7C5CFF',
        ink: '#FAFAFA',
        muted: '#8A8A93'
      }
    }
  },
  plugins: []
};

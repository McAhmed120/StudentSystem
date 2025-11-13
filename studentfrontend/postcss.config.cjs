module.exports = {
  plugins: [
    // Use the PostCSS plugin package for Tailwind v4+
    // See error message: install @tailwindcss/postcss
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};

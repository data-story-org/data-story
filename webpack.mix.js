const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

// bundle into dist/
mix
  .ts('src/index.tsx', 'dist/js')
  .react()
  .sass('src/sass/app.scss', 'dist/css')
  .options({
    processCssUrls: true,
    postCss: [tailwindcss('./src/sass/tailwind.config.js')],
  })
  // fonts loading
  .setResourceRoot('../')
  .copy('fonts', 'dist/fonts')
  .copy('dist', 'public');

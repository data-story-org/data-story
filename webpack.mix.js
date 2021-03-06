const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

// bundle into dist/
mix
  .ts('src/render.tsx', 'dist/js')
  .react()
  .sass('src/sass/app.scss', 'dist/css')
  .options({
    processCssUrls: true,
    postCss: [tailwindcss('./configs/tailwind.config.js')],
  })
  // fonts loading
  .setResourceRoot('../')
  .copy('fonts', 'dist/fonts')
  .copy('dist', 'public');

// Disable mix-manifest.json
Mix.manifest.refresh = (_) => void 0;

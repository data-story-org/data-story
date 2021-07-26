const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

// bundle into dist/
mix
  .ts('src/core/index.tsx', 'dist/js')
  .react()
  .sass('src/core/sass/app.scss', 'dist/css')
  .options({
    processCssUrls: true,
    postCss: [tailwindcss('tailwind.config.js')],
  })
  // fonts loading
  .setResourceRoot('../')
  .copy('fonts', 'public/fonts')
  .copy('dist', 'public') // easy dev access
  .copy('dist', 'docs')
  .copy('public/index.html', 'docs/index.html'); // github pages requires dir 'docs'

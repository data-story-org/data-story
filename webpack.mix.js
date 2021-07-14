const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const TerserPlugin = require('terser-webpack-plugin');

// bundle into dist/
mix
  .ts('src/core/app.tsx', 'dist/js')
  .react()
  .webpackConfig({
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: { output: { comments: false } },
        }),
      ],
    },
  })
  .sass('src/core/sass/app.scss', 'dist/css')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')],
  })
  .copy('dist', 'public') // easy dev access
  .copy('dist', 'docs')
  .copy('public/index.html', 'docs/index.html'); // github pages requires dir 'docs'

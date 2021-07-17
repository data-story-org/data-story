const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const TerserPlugin = require('terser-webpack-plugin');

const defaultMixConfig = () => {
  return mix
    .ts('src/core/app.tsx', 'dist/js')
    .react()
    .sass('src/core/sass/app.scss', 'dist/css')
    .options({
      processCssUrls: false,
      postCss: [tailwindcss('tailwind.config.js')],
    })
    .copy('dist', 'public') // easy dev access
    .copy('dist', 'docs')
    .copy('public/index.html', 'docs/index.html'); // github pages requires dir 'docs'
};

//
// bundle into dist/
if (process.env.NODE_ENV === 'production') {
  defaultMixConfig().webpackConfig({
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: { output: { comments: false } },
        }),
      ],
    },
  });
} else {
  defaultMixConfig();
}

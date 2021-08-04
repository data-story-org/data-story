const mix = require('laravel-mix');

// simplified to what causing errors
mix
  .ts('src/index.tsx', 'dist/js')
  .react()
  // fonts loading
  .setResourceRoot('../')
  .copy('dist', 'public') // easy dev access
	.dump()
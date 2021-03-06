const babelJestConfig = [
  'babel-jest',
  { configFile: './tests/babel.config.json' },
];

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!@data-story-org/core)',
  ],
  transform: {
    '\\.js$': babelJestConfig,
    '\\.jsx$': babelJestConfig,
  },
  // FIXME remove this when jest will
  // support package.json "exports"
  // https://github.com/facebook/jest/issues/9771
  // https://github.com/facebook/jest/issues/10422
  // moduleNameMapper: {
  //   '^@data-story-org/core/(.*)$':
  //     '@data-story-org/core/lib/src/$1',
  // },
};

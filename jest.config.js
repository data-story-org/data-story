module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    // '/node_modules/?!(@data-story-org/core).+js$',
    '/node_modules/(?!@data-story-org/core)',
  ],
  transform: {
    '\\.js$': 'babel-jest',
  },
};

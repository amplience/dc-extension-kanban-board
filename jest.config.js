module.exports = {
  ...require("@snowpack/app-scripts-svelte/jest.config.js")(),

  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@svelte|message-event-channel|@smui))',
  ],
  testPathIgnorePatterns: ['node_modules', 'cdk'],
  moduleFileExtensions: ['ts', 'js', 'node', 'svelte'],
  collectCoverage: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'ts-jest',
  },
};

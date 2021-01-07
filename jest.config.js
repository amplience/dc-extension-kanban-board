const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$';

module.exports = {
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
    '^.+\\.svg$': '<rootDir>/file-transformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@svelte|message-event-channel|@smui))',
  ],
  testPathIgnorePatterns: ['node_modules', 'cdk'],
  moduleFileExtensions: ['ts', 'js', 'node', 'svelte'],
  collectCoverage: true,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'ts-jest',
  },
  setupFiles: ['jest-localstorage-mock'],
};

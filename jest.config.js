module.exports = {
  testRegex: '/__tests__/.*\\.spec\\.(ts|tsx)$',
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/'
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'node'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleDirectories: [
    'node_modules'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/__tests__/tsconfig.json',
      diagnostics: false
    }
  }
};

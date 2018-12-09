module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/pages'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js')
};

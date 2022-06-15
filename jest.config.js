/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts$",
  testTimeout: 30000,
  modulePathIgnorePatterns: [
      "/tests/setup.ts"
  ],
  globalSetup: './tests/setup.ts',
};

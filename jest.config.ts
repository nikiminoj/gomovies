/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Add a mock for the server-only database module
  modulePathIgnorePatterns: ["<rootDir>/__tests__/__mocks__"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/__mocks__/db.mock.ts"]
};
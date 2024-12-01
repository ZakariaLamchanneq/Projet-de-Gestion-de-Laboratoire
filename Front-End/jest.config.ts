import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: [
    '**/+(*.)+(spec|test).+(ts|js)', // Pattern for finding test files
  ],
  collectCoverage: true, // Optionally collect test coverage
};

export default config;

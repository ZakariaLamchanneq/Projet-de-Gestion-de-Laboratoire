import { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@angular|rxjs|zone\\.js)',
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage/',
};

export default config;

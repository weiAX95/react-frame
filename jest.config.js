module.export = {
  testMatch: ['**/tests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: [],
  rootDir: '',
  transform: {
    '.(ts|tsx)': '@swc/jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};

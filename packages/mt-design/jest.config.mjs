import path from 'node:path';

/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
export default {
    preset: 'ts-jest',
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
    setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // react: path.resolve('node_modules/react/jsx-runtime.js'),
        '@mlkty/mt-shared-utils': path.resolve('../mt-shared-utils/src/index.ts'),
        '@mlkty/mt-design-headless': path.resolve('../mt-design-headless/src/index.ts'),
    },
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        '!src/components/**/__tests__/**/*.{ts,tsx}',
        '!src/components/**/demos/**/*.{ts,tsx}',
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    maxWorkers: '50%',
};

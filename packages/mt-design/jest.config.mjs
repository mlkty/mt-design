import path from 'node:path';

/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
export default {
    preset: 'ts-jest',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '@mlkty/mt-shared-utils': path.resolve('../mt-shared-utils/src/index.ts'),
        '@mlkty/mt-design': path.resolve('./src/index.ts'),
        '@mlkty/mt-design-headless': path.resolve('../mt-design-headless/src/index.ts'),
    },
    collectCoverageFrom: [
        '**/__tests__/**/*.{ts,tsx}',
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    maxWorkers: '50%',
};

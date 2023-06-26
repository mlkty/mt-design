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
    },
    collectCoverageFrom: [
        '**/__tests__/**/*.{ts,tsx}',
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    maxWorkers: '50%',
};

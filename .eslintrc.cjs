module.exports = {
    // 参考：https://www.npmjs.com/package/@ecomfe/eslint-config
    extends: [
        '@ecomfe/eslint-config/strict',
        '@ecomfe/eslint-config/typescript/strict',
        '@ecomfe/eslint-config/import/strict',
        '@ecomfe/eslint-config/react/strict',
    ],

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },

    rules: {
        '@typescript-eslint/no-floating-promises': 0,
        'consistent-return': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': ['error', 'never', {
            'scss': 'always',
        }],
        'import/order': [
            'error',
            {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
            },
        ],
    },

    overrides: [
        {
            files: ['*.d.ts', '*.cjs', '*.test.ts', '*.json'],
            rules: {
                'import/unambiguous': 'off',
                'import/no-commonjs': 'off',
            },
        },
    ],

    ignorePatterns: [
        'node_modules',
        '**/libs/**/*.ts',
        '**/libs/**/*.tsx',
        'tsconfig.json',
        'package.json',
    ],
};

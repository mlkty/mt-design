module.exports = {
    extends: [
        '@ecomfe/eslint-config/strict',
        '@ecomfe/eslint-config/typescript/strict',
        '@ecomfe/eslint-config/import/strict',
        '@ecomfe/eslint-config/react/strict',
    ],
    rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        'consistent-return': 'off',
        // 可以暂时不考虑
        'react/jsx-no-bind': 'off',
        // @todo 这个 alias 配置需要研究下，不然会报错
        'import/no-unresolved': 'off',
        // monorepo 下这玩意感觉抽风了找不到上一层的
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/extensions': [
            'error',
            'never',
            {
                scss: 'always',
                css: 'always',
                json: 'always',
                png: 'always',
                mjs: 'always',
            },
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                    },
                ],
            },
        ],
    },

    // 针对配置类型文件禁用
    overrides: [
        {
            files: ['*.cjs', '*.js', '*.d.ts'],
            rules: {
                'import/unambiguous': 'off',
                'import/no-commonjs': 'off',
            },
        },
        {
            files: ['**/demos/**/*.tsx', '**/__tests__/**/*.tsx'],
            rules: {
                'max-len': 'off',
            },
        },
    ],

    ignorePatterns: [
        'node_modules',
        '**/lib/**/*.ts',
        '**/es/**/*.tsx',
        '*.json',
    ],
};

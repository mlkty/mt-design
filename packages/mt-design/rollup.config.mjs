import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';

/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
    {
        input: 'src/index.ts',
        output: {
            format: 'esm',
            dir: 'dist',
        },
        plugins: [
            commonjs(),
            nodeResolve({
                extensions: ['.ts', '.tsx', '.js'],
            }),
            esbuild({}),
            postcss({
                extract: 'css/index.css',
            }),
        ],
        external: [
            'react',
            'react-dom',
        ],
    },
];

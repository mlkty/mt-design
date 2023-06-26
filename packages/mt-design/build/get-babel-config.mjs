import transformImportExt from './babel-plugin-transform-import-ext.mjs';

export default function getBabelConfig(modules) {
    return {
        presets: [
            [
                '@babel/preset-env', {
                    modules,
                    targets: {
                        // http://browsersl.ist/#q=%3E0.25%25%2C+not+ie+11%2C+not+op_mini+all
                        browsers: [
                            '>0.25%',
                            'not ie 11',
                            'not op_mini all',
                        ],
                    },
                },
            ],
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime', {
                    useESModules: modules === false,
                    version: '^7.22.5',
                },
            ],
            [
                '@babel/plugin-transform-typescript', {
                    isTSX: true,
                },
            ],
            transformImportExt({
                '.scss': '.css',
            }),
        ],
    };
}

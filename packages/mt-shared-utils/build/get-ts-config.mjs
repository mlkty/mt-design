import fs from 'node:fs';

import { getProjectPath } from './get-project-helper.mjs';

function readJSON(file) {
    console.log('file', file);
    const data = fs.readFileSync(file, {
        encoding: 'utf-8'
    });
    return JSON.parse(data, null, 2);
}

export default function getTSConfig() {
    let my = {};
    const config = getProjectPath('tsconfig.json');
    if (fs.existsSync(config)) {
        my = readJSON(config);
    }

    return Object.assign(
        {
            noUnusedParameters: true,
            noUnusedLocals: true,
            strictNullChecks: true,
            target: 'es6',
            jsx: 'preserve',
            moduleResolution: 'node',
            declaration: true,
            allowSyntheticDefaultImports: true,
        },
        my.compilerOptions
    );
}


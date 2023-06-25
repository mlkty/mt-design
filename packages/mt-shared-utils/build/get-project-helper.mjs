import path from 'node:path';

const cwd = process.cwd();

export function getProjectPath(...args) {
    return path.resolve(cwd, ...args);
}

import path from 'node:path';
import { defineConfig } from 'dumi';

function resolvePackage(name: string) {
  return path.resolve(__dirname, 'packages', name, 'src');
}

export default defineConfig({
  themeConfig: {
    name: 'MT-design',
  },

  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],

  resolve: {
    atomDirs: [
      {
        type: 'components',
        dir: 'packages/mt-design/src/components',
      },
      {
        type: 'headless',
        dir: 'packages/mt-design-headless/src/components',
      },
    ],
  },

  alias: {
    '@mlkty/mt-shared-utils': resolvePackage('mt-shared-utils'),
    '@mlkty/mt-design-headless': resolvePackage('mt-design-headless'),
    '@mlkty/mt-design': resolvePackage('mt-design'),
  },
});

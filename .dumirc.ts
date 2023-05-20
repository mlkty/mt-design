import { defineConfig} from 'dumi';
import path from 'node:path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'fig',
    footer: 'Open-source MIT Licensed | Copyright © 2023 \n Powered by SO',
    logo: '/logo.svg',
  },
  resolve: {
    atomDirs: [
      {
        type: 'components',
        dir: 'components',
      },
    ]
  },
  alias: {
    '@baidu/so-fig': path.resolve(__dirname, 'components'),
  },
  favicons: ['/favicon.ico']
});

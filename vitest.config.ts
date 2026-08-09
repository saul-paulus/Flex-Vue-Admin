import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: [
      { find: /^~\/domain\/(.*)/, replacement: path.resolve(__dirname, 'domain/$1') },
      { find: /^~\/application\/(.*)/, replacement: path.resolve(__dirname, 'application/$1') },
      { find: /^~\/infrastructure\/(.*)/, replacement: path.resolve(__dirname, 'infrastructure/$1') },
      { find: /^@domain\/(.*)/, replacement: path.resolve(__dirname, 'domain/$1') },
      { find: /^@application\/(.*)/, replacement: path.resolve(__dirname, 'application/$1') },
      { find: /^@infrastructure\/(.*)/, replacement: path.resolve(__dirname, 'infrastructure/$1') },
      { find: '~/domain', replacement: path.resolve(__dirname, 'domain') },
      { find: '~/application', replacement: path.resolve(__dirname, 'application') },
      { find: '~/infrastructure', replacement: path.resolve(__dirname, 'infrastructure') },
      { find: '@domain', replacement: path.resolve(__dirname, 'domain') },
      { find: '@application', replacement: path.resolve(__dirname, 'application') },
      { find: '@infrastructure', replacement: path.resolve(__dirname, 'infrastructure') },
      { find: '~', replacement: path.resolve(__dirname, 'app') },
      { find: '@', replacement: path.resolve(__dirname, 'app') },
      { find: '~~', replacement: path.resolve(__dirname, '.') },
      { find: '@@', replacement: path.resolve(__dirname, '.') },
    ],
  },
});

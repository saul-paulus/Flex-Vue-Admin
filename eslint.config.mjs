import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      // Nonaktifkan paksaan linter karena bertabrakan dengan Prettier format-on-save
      'vue/html-self-closing': 'off',
      'prefer-const': 'error',
    },
  },
  {
    ignores: [
      'src/assets/niceadmin/vendor/**',
      '**/bootstrap.min.js',
      'dist/**',
      'node_modules/**',
    ],
  },
);

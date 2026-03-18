// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  sourcemap: {
    server: false,
    client: false  // mematikan sourcemap di sisi peramban
  },
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/test-utils/module',
  ],
  css: ['~~/assets/scss/app.scss', '~~/assets/css/main.css'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations:
              ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },
  app: {
    head: {
      title: 'BGI | SMPM',
      meta: [
        {name: 'Aplikasi SMPM', content: 'Aplikasi SMPM for project'},
      ],
      htmlAttrs: {lang: 'en'},
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/bgi_favicon.ico'},
        {
          rel: 'stylesheet',
          href: '',
        },
        {
          rel: 'stylesheet',
          href:
              'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css',
        },
      ],
      script: [
        {
          src: '',
        },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    }
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
});

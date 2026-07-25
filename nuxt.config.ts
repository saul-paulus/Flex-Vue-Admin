// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/test-utils/module', 'pinia-plugin-persistedstate/nuxt'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Template | niceAdmin',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/bgi_favicon.ico' },
        {
          rel: 'stylesheet',
          href: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css',
        },
      ],
      script: [
        {
          src: '',
        },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { textContent: 'JavaScript is required' },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  css: ['~~/assets/scss/app.scss', '~~/assets/css/main.css'],
  sourcemap: {
    server: false,
    client: false, // mematikan sourcemap di sisi peramban
  },
  compatibilityDate: '2025-07-15',

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
      },
    },
  },
  // runtimeConfig: {public: {apiBase: import.meta.env.VITE_API_BASE_URL}}
});

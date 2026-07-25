// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/test-utils/module', 'pinia-plugin-persistedstate/nuxt'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Template | flexVueAdmin',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css',
        },
      ],
      noscript: [{ textContent: 'JavaScript is required' }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  css: ['~~/assets/scss/app.scss', '~~/assets/css/main.css'],

  // ── Runtime Configuration ──
  // Access via useRuntimeConfig() in composables/plugins/middleware
  // Override with environment variables: NUXT_PUBLIC_API_BASE
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    },
  },

  sourcemap: {
    server: false,
    client: false,
  },
  compatibilityDate: '2025-07-15',

  vite: {
    build: {
      modulePreload: {
        polyfill: false,
      },
    },
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
});

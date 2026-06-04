// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  ui: {
    colorMode: true,
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          'fade-up': {
            initial: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 }
          }
        }
      }
    }
  },
  i18n: {
    defaultLocale: 'id',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    locales: [
      { code: 'id', language: 'id-ID', file: 'id.json' },
      { code: 'en', language: 'en-US', file: 'en.json' }
    ]
  },

})
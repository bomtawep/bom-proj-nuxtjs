// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': { isr: true }
    },
    modules: ["@nuxt/ui"]
  },
  $development: {
    devtools: { enabled: true },
    modules: ["@nuxt/ui"]
  },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: process.env.NEXT_PUBLIC_API_URL,
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  experimental: {
    viewTransition: true
  },
})
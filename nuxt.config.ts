// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxt/image'
  ],
  robots: {
    rules: {
      UserAgent: '*',
      Disallow: ''
    }
  },
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  googleFonts: {
    families: {
      'Nanum Gothic': [400, 700, 800],
      'Nanum Gothic Coding': [400, 700],
      'Black Ops One': [400]
    }
  },
  css: [
    '~/assets/css/base.css',
    '~/assets/css/github-markdown.css',
  ],
})

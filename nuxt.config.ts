// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],

  robots: {
    allow: '/',
  },

  content: {
    highlight: {
      theme: 'nord',
    },
  },

  googleFonts: {
    families: {
      'Black+Ops+One': true,
    },
  },

  css: [
    '~/assets/css/font.css',
    '~/assets/css/base.css',
    '~/assets/css/github-markdown.css',
  ],

  compatibilityDate: '2025-01-07',

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});

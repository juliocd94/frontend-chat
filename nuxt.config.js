export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-chat',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/assets/libs/magnific-popup/magnific-popup.css' },
      { rel: 'stylesheet', href: '/assets/libs/owl.carousel/assets/owl.carousel.min.css' },
      { rel: 'stylesheet', href: '/assets/libs/owl.carousel/assets/owl.theme.default.min.css' },

      { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/assets/css/icons.min.css' },
      { rel: 'stylesheet', href: '/assets/css/app.min.css' },
    ],
    script: [
      { src:'/assets/libs/jquery/jquery.min.js'},
      { src:'/assets/libs/bootstrap/js/bootstrap.bundle.min.js'},
      { src:'/assets/libs/simplebar/simplebar.min.js'},
      { src:'/assets/libs/node-waves/waves.min.js'},

      { src:'/assets/libs/magnific-popup/jquery.magnific-popup.min.js'},

      { src:'/assets/libs/owl.carousel/owl.carousel.min.js'},

      { src:'/assets/js/pages/index.init.js'},
      { src:'/assets/js/app.js'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/socket',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'vue-sweetalert2/nuxt',
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

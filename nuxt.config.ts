export default {
  ssr: false,
  target: "static",
  app: {
    head: {
      title: "Black Country",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/driver.js/dist/driver.min.css' }
      ],
      script: [
        // { src: '/webviewer/ui/webviewer-ui.min.js' },
        // { src: "https://newwebpay.qa.interswitchng.com/inline-checkout.js", defer: true }
        {
          src: "https://newwebpay.qa.interswitchng.com/inline-checkout.js",
          defer: true,
        },

      ]
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["/assets/css/main.css",  'intro.js/minified/introjs.min.css'],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  build: {
    transpile: ["@pdftron/webviewer", 'vee-validate'],
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg'
    }
  },

  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },

  plugins: ['~/plugins/google-maps.client.ts', '~/plugins/intro.client.ts', '~/plugins/dayjs.ts', '~/plugins/vee-validate.ts'],

  vite: {
    optimizeDeps: {
      include: ['fast-deep-equal']
    },
    build: {
      // transpile: ['@vueup/vue-quill'],
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("pdfjs-dist")) {
              return "pdfjs";
            }
          },
        },
      },
    },
    // server: {
    //   fs: {
    //     allow: ["public/lib"],
    //   },
    // },
  },

  compatibilityDate: "2024-09-30"
};

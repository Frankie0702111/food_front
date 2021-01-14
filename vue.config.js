module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: "zh",
      fallbackLocale: "zh",
      localeDir: "locales",
      enableInSFC: false
    }
  },

  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://127.0.0.1:8888',
        ws: true,
        changeOrigin: true
      },
    }
  },
}
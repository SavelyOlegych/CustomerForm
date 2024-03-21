const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/CustomerForm/" : "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: "@import '@/assets/scss/vars';"
      }
    }
  }
});
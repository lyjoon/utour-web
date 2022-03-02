const path = require('path')
const process = require('process')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  //outputDir : path.resolve(__dirname, "../api/src/main/resources/static"),
  //runtimeCompiler: true,
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    proxy:{
      '/api': {
        target: process.env.VUE_APP_SVC_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

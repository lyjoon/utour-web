module.exports = {
  //publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  lintOnSave: false,
  runtimeCompiler: true,
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    host: 'localhost',
    proxy:{
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

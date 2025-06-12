const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包配置
  publicPath: '/',
  // 开发服务器配置
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    // 添加代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 后端服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 不重写路径
        }
      }
    }
  }
})

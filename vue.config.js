module.exports = {
  configureWebpack: {
    devServer: {
      host: 'localhost',
      port: 8080,
      hot: true,
      open: true,
      historyApiFallback: true,
      proxy: {
        '/weather': {
          target: 'https://api.openweathermap.org',
          pathRewrite: { '^/weather': '/' },
          secure: false,
          changeOrigin: true,
        },
      },
    },
  },
}

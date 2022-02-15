module.exports = {
  publicPath: '/weather-vue/',
  configureWebpack: {
    devServer: {
      host: 'localhost',
      port: 8080,
      hot: true,
      open: true,
      historyApiFallback: true,
      proxy: {
        '/weather': {
          target: 'https://express-weather-heroku.herokuapp.com',
          // target: 'http://localhost:7070',
          pathRewrite: { '^/weather': '/' },
          secure: false,
          changeOrigin: true,
        },
      },
    },
  },
}

const path = require('path')
const project = require('./project.config')

// the configure of webpack dev server & webpack dev middleware
const serverConfig = {
  publicPath: '/',
  contentBase: path.join(project.basePath, 'src'),
  hot: false,
  noInfo: false,
  quiet: false,
  https: false,
  historyApiFallback: true,
  stats: {
    chunks: false,
    colors: true
  }
}

if (project.globals.__DEV__) {
  serverConfig.hot = true
}

if (project.globals.__PROD__) {
  serverConfig.stats.chunks = true
  serverConfig.compress = true
}

module.exports = serverConfig

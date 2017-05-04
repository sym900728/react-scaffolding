const path = require('path')
const ip = require('ip')

// project configuration
const config = {
  // project base path
  basePath: path.resolve(__dirname, '..'),
  // environment
  env: process.env.NODE_ENV || 'development',
  // analyze
  // use the source-map-explorer https://github.com/danvk/source-map-explorer
  analyze: process.env.ANALYZE || false,

  // server host
  serverHost: ip.address(),
  // server port
  serverPort: process.env.PORT || 3000,

  compilerFailOnWarning: false

}

// project environment
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test'
}

// the optional webpack dev config attribute by the project's environment
config.webpackDevConfig = {
  devtool: (config.analyze) ? 'source-map' : 'eval-source-map'
}

// the optional webpack prod config attribute by the project's environment
config.webpackProdConfig = {
  devtool: (config.analyze) ? 'source-map' : false,
  uglifyJsSourceMap: config.analyze
}

config.comilerStats = {
  chunks: true,
  chunkModules: true,
  colors: true
}

config.paths = {
  srcPublic: path.join(config.basePath, 'src/public'),
  distPublic: path.join(config.basePath, 'dist/public')
}

module.exports = config

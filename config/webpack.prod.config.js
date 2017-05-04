const path = require('path')
const project = require('./project.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: project.webpackProdConfig.devtool,
  cache: true,
  context: path.join(project.basePath, 'src'),
  resolve: {
    modules: [
      path.join(project.basePath, 'src'),
      'node_modules'
    ]
  }
}

/* =================================================== entry ================================================= */
webpackConfig.entry = {
  app: ['./index.js'],
  vendor: [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-router',
    'react-bootstrap',
    'react-redux',
    'redux',
    'redux-thunk',
    'axios',
    'lodash',
    'immutable',
    'moment'
  ]
}

webpackConfig.output = {
  filename: '[name].[chunkhash].js',
  path: path.join(project.basePath, 'dist'),
  publicPath: '/'
}

/* ================================================= loaders ================================================== */
// not use less file, if you want to use less file, you must add the less-loader module and configure it.
// json-loader is not required anymore

webpackConfig.module = {}

// webpack1 is webpackConfig.module.loaders, but webpack2 is webpackConfig.module.rules
webpackConfig.module.rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{loader: 'babel-loader', options: {cacheDirectory: true}}]
}]

// css-loader: https://github.com/webpack-contrib/css-loader
// postcss-loader: https://github.com/postcss/postcss-loader

// Don't use the ExtractTextPlugin in development. It can be used in production.
webpackConfig.module.rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {loader: 'css-loader', options: {modules: true, importLoaders: 1}},
      {loader: 'postcss-loader'}
    ]
  })
})

// Don't use the ExtractTextPlugin in development. It can be used in production.
webpackConfig.module.rules.push({
  test: /\.scss/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {loader: 'css-loader', options: {modules: true, importLoaders: 1}},
      {loader: 'postcss-loader'},
      {loader: 'sass-loader'}
    ]
  })
})

webpackConfig.module.rules.push({
  test: /\.(png|jpg)/,
  use: [{loader: 'url-loader', options: {limit: 8912}}]
})

webpackConfig.module.rules.push({
  test: /\.(ttf|eot|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: [{loader: 'file-loader'}]
})

/* ================================================= plugins =============================================== */
// OccurenceOrderPlugin has been renamed to OccurrenceOrderPlugin
// webpack.optimize.OccurrenceOrderPlugin is now on by default
// webpack.optimize.DedupePlugin isn't needed anymore. Remove it rom your configuration.

// The description of the html-webpack-plugin at https://github.com/ampedandwired/html-webpack-plugin
webpackConfig.plugins = [(
  new HtmlWebpackPlugin({
    template: 'index.html',
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  })
)]

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: project.basePath
    }
  })
)

// Tells React to build in either dev or prod modes.
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: false,
    'process.env.NODE_ENV': JSON.stringify('production')
  })
)

// WARNING in webpack: Using NoErrorsPlugin is deprecated. Use NoEmitOnErrorsPlugin instead.
webpackConfig.plugins.push(
  new webpack.NoEmitOnErrorsPlugin()
)

webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  })
)

// Uglify js files. Minify js files. Use it in production
// Don't use the UglifyJsPlugin in development. Because it slows down the executed speed.
webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false,
      drop_console: true
    },
    comments: false,
    sourceMap: project.webpackProdConfig.uglifyJsSourceMap
  })
)

// Extract text plugin. Don't use the plugin in development. It can be used in the production.
webpackConfig.plugins.push(
  new ExtractTextPlugin({
    filename: 'css/[hash].css',
    disable: false,
    allChunks: true
  })
)

webpackConfig.plugins.push(
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
)

module.exports = webpackConfig

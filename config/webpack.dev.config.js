const path = require('path')
const project = require('./project.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: project.webpackDevConfig.devtool,
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
  app: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + project.serverPort,
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  vendor: [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'react-bootstrap',
    'redux',
    'redux-thunk',
    'axios',
    'lodash',
    'immutable',
    'moment'
  ]
}

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: path.join(project.basePath, 'dist'),
  publicPath: '/'
}

/* ================================================= loaders ================================================== */
// not use less file, if you want to use less file, you must add the less-loader module and configure it.
// json-loader is not required anymore

webpackConfig.module = {}

// webpack1 is webpackConfig.module.loaders. but webpack2 is webpackConfig.module.rules
webpackConfig.module.rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{loader: 'babel-loader', options: {cacheDirectory: true}}]
}]

// css-loader: https://github.com/webpack-contrib/css-loader
// postcss-loader: https://github.com/postcss/postcss-loader
webpackConfig.module.rules.push({
  test: /\.css$/,
  use: [
    {loader: 'style-loader'},
    {loader: 'css-loader', options: {modules: true, sourceMap: true, importLoaders: 1, minimize: false}},
    {loader: 'postcss-loader'}
  ]
})

webpackConfig.module.rules.push({
  test: /\.scss/,
  use: [
    {loader: 'style-loader'},
    {loader: 'css-loader', options: {modules: true, sourceMap: false, importLoaders: 1, minimize: false}},
    {loader: 'postcss-loader'},
    {loader: 'sass-loader', options: {sourceMap: true}}
  ]
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
// The description of the html-webpack-plugin at https://github.com/ampedandwired/html-webpack-plugin
webpackConfig.plugins = [(
  new HtmlWebpackPlugin({
    template: 'index.html',
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: false
    }
  })
)]

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      context: project.basePath
    }
  })
)

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

// prints more readable module names in the browser console on HMR updates
webpackConfig.plugins.push(
  new webpack.NamedModulesPlugin()
)

// WARNING in webpack: Using NoErrorsPlugin is deprecated. Use NoEmitOnErrorsPlugin instead.
webpackConfig.plugins.push(
  new webpack.NoEmitOnErrorsPlugin()
)

// Tells React to build in either dev or prod modes.
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development')
  })
)

webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
  })
)

module.exports = webpackConfig

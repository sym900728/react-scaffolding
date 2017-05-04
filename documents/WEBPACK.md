## webpack

Using the webpack 2 to pack project (the webpack 1 is deprecated). 
If you want to learn more, you can visit the [webpack2](https://webpack.js.org/)

### 1. What's the basic configure about webpack?

The basic config about webpack will not be written in this document. If you want to learn, please check the [webpack2](https://webpack.js.org/).

### 2. Why to use html-webpack-plugin?

Using html-webpack-plugin is for the html template.
learn more about [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

### 3. Why to use postcss?

Using postcss to autoprefix the css. Note: using the postcss.config.js to configure the postcss, don't write the config in the config of the webpack.
So, it can be maintained easily.
learn more about [postcss](https://github.com/postcss/postcss)

### 4. How to configure webpack2 tree shaking?

learn more about [webpack2 tree shaking](https://webpack.js.org/guides/tree-shaking/)

webpack config:
```
resolve: {
    modules: [
      path.join(project.basePath, 'src'),
      'node_modules'
    ]
  }
```
.babelrc
```
["es2015", {"modules": false}]
```

### 5. How to separate the development, testing and production model?

Before this, Using the environment variable to distinguish the development, testing and production model. 
But it is not readable, also it is not maintainable. So, Using the separated files to maintain the model.

The config/webpack.dev.config.js is for the development model.
The config/webpack.prod.config.js is for the production model.
The testing model is not implemented.

### 6. What's the differences about the development model and the production model?

#### a. The webpack entry.

The development model:

```
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
```

Using react-hot-loader for the HMR.

The production model:
```
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
```

#### b. The webpack.DefinePlugin

The development model:
```
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development')
  })
)
```

The production model:
```
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: false,
    'process.env.NODE_ENV': JSON.stringify('production')
  })
)
```

Using this form the [react optimize](https://facebook.github.io/react/docs/optimizing-performance.html#webpack)

#### c. The webpack.optimize.UglifyJsPlugin

The production model:
```
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
```

Using webpack.optimize.UglifyPlugin to reduce the js file size.

#### d. The extract-text-webpack-plugin

The production model:
```
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
```

```
webpackConfig.plugins.push(
  new ExtractTextPlugin({
    filename: 'css/[hash].css',
    disable: false,
    allChunks: true
  })
)
```

Using extract-text-webpack-plugin to extract the css to css file.

#### f. The compression-webpack-plugin

The production model:
```
webpackConfig.plugins.push(
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
)
```

Using the compression-webpack-plugin to compress js files, and output .gz files.

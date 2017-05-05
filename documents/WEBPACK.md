## webpack

Using the webpack 2 to pack project (the webpack 1 is deprecated).

If you want to learn more, you can visit the [webpack2](https://webpack.js.org/)

As below, listing many questions that I suffered from the react project.

### 1. What's the basic configure about webpack?

The basic config about webpack will not be written in this document.

### 2. How to config webpack-dev-server, why to use?

Using the webpack-dev-server to be the develop server.
```
"webpack-dev-server": "^2.4.5"
```

The config/server.config.js is about the configure of the webpack-dev-server.

Before webpack-dev-server, I used the express as the development sever. it's so hard to configure.

So choosing the webpack-dev-server as the development server.

### 3. What's html-webpack-plugin, how to use, why to use?

Using html-webpack-plugin is for the html template.
learn more about [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

The webpack output the vendor.js, app.js will inject into the index.html.

### 4. What's postcss, how to use, why to use?

Using postcss to autoprefix the css. Note: using the postcss.config.js to configure the postcss, don't write the config in the config of the webpack.
So, it can be maintained easily.
learn more about [postcss](https://github.com/postcss/postcss)

### 5. What's webpack2 tree shaking, how to use, why to use?

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

### 6. What's compression-webpack-plugin, how to use, why to use in production model?

In the config/webpack.prod.config.js
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

The usage of the [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin).
If you use the nginx server. please set as below:
```
gzip_static  on;
```

Using the static gzip, not using the dynamic gzip. Because the dynamic gzip will cost cpu performance.

When user visit your website for the first time and their browsers do not have cache.
The server will send js files to user's browser. Because of the sizes of js files is so huge.

So it needs more time to transfer the files. The user will wait for your website for long time.

So we need compress the js files to reduce the sizes of the js files.

If you have a more effective way to compress the js files. please add it to the issues.

### 7. What's webpack.optimize.UglifyJsPlugin, how to use it, why to use it?

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

### 8. What's extract-text-webpack-plugin, how to use, why to use?

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

### 9. What's webpack.DefinePlugin, how to use, why to use?

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

### 10. What's react-hot-loader, how to use, why to use?

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

Using the react-hot-loader to HMR.

### 11. How to separate the development, testing and production model?

Before this, Using the environment variable to distinguish the development, testing and production model. 
But it is not readable, also it is not maintainable. So, Using the separated files to maintain the model.

The config/webpack.dev.config.js is for the development model.
The config/webpack.prod.config.js is for the production model.
The testing model is not implemented.

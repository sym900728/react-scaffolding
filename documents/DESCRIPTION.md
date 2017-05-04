# Description

I will list many problems that I suffered from the react project.

## Tools

### node

Using node environment to develop react project.

### npm vs yarn

Watching the [npm](https://docs.npmjs.com/) and the [yarn](https://yarnpkg.com/) for more information.

### babel

Using babel to transform js code to support browser.

Babel in the package.json.
```
"babel-core": "^6.24.1",
"babel-eslint": "^7.2.3",
"babel-jest": "^19.0.0",
"babel-loader": "^7.0.0",
"babel-plugin-istanbul": "^4.1.3",
"babel-plugin-lodash": "^3.2.8",
"babel-plugin-module-resolver": "^2.7.0",
"babel-plugin-root-import": "^5.1.0",
"babel-plugin-transform-decorators-legacy": "^1.3.4",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"babel-preset-stage-1": "^6.24.1",
"babel-register": "^6.24.1",
```

configure the .babelrc.
```
{
  "presets": [
    ["es2015", {"modules": false}],
    "react",
    "stage-1"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "transform-decorators-legacy",
    ["babel-plugin-root-import", [{
      "rootPathPrefix": "~",
      "rootPathSuffix": "src"
    }, {
      "rootPathPrefix": "@",
      "rootPathSuffix": "src/routes/Admin"
    }
  ]]
  ]
}

```

#### babel with webpack
```
webpackConfig.module.rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{loader: 'babel-loader', options: {cacheDirectory: true}}]
}]
```

configure babel-loader within the webpack.


### webpack

Using the webpack 2 to pack project. (the webpack 1 is deprecated) 
If you want to learn more, you can visit the [webpack2](https://webpack.js.org/)

#### 1. How to separate the development, testing and production model?

Before this, Using the environment variable to distinguish the development, testing and production model. 
But it is not readable, also it is not maintainable. So, Using the separated files to maintain the model.

The config/webpack.dev.config.js is for the development model.
The config/webpack.prod.config.js is for the production model.
The testing model is not implemented.

#### 2. What's the configure about webpack ?

The basic configure about webpack will not be written in this document. If you want to learn, please check the [webpack2](https://webpack.js.org/).

#### 3. Why to use html-webpack-plugin ?

Using html-webpack-plugin is for the html template.
learn more about [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

#### 4. Why to use postcss ?

Using postcss to autoprefix the css. Note: using the postcss.config.js to configure the postcss, don't write the config in the config of the webpack.
So, it can be maintained easily.
learn more about [postcss](https://github.com/postcss/postcss)

#### 5. How to configure webpack2 tree sharking?

#### 6. What's the differences about the development model and the production model?

##### a. The webpack entry.

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

##### b. The webpack.DefinePlugin

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

##### c. The webpack.optimize.UglifyJsPlugin

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

##### d. The extract-text-webpack-plugin

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

##### f. The compression-webpack-plugin

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

### webpack dev server

Using the webpack-dev-server to be the develop server.
```
"webpack-dev-server": "^2.4.5"
```

The config/server.config.js is about the configure of the webpack-dev-server.


### eslint

If you want to learn more, you can visit the [eslint](http://eslint.org/)

#### Motivation

When the project is growing up and many people develop single project, many people have many code styles, but it should be uniform. 
Also many people have many error code.
Using the eslint to unify the code style and check the code.

The eslint with the react project will use these modules.

```
"eslint": "^3.19.0",
"eslint-config-standard": "^10.2.1",
"eslint-config-standard-react": "^5.0.0",
"eslint-plugin-babel": "^4.1.1",
"eslint-plugin-import": "^2.2.0",
"eslint-plugin-node": "^4.2.2",
"eslint-plugin-promise": "^3.5.0",
"eslint-plugin-react": "^6.10.3",
"eslint-plugin-standard": "^3.0.1"
```

It has been list in the package.json

#### 1. Don't want to lint the files under some folders?
Using the .eslintignore file to not lint the files.

#### 2. Don't want to use some rules, or want to close/disable some rules?
Using the .eslintrc file to configure rules to open or close some rules.

```
"rules": {
    "max-len": [2, 120, 2],
    "object-property-newline": [0],
    "no-var": [2],
    "react/prop-types": [0]
}
```

#### 3. How to use eslint in the WebStorm?
![webstorm-eslint-config.png](https://github.com/sym900728/react-scaffolding/blob/master/documents/images/webstorm-eslint-config.png)


## React Redux

### Description



## React Components

## Optimize


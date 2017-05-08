## babel

Using babel to transform js code to support browser.

### 1. How to configure babel?

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

### 2. How to configure babel in the webpack?

```
webpackConfig.module.rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{loader: 'babel-loader', options: {cacheDirectory: true}}]
}]
```

configure babel-loader within the webpack.

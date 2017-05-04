# Ⅰ. Tools

## node

Using node environment to develop react project.

## npm vs yarn

Using yarn to fixed the modules' version.

### 1. What's npm?

Watching the [npm](https://docs.npmjs.com/) for more information.

### 2. What's yarn?

Watching the [yarn](https://yarnpkg.com/) for more information.

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


## webpack

Please reading the [details](https://github.com/sym900728/react-scaffolding/blob/master/documents/WEBPACK.md)

## webpack dev server

Using the webpack-dev-server to be the develop server.
```
"webpack-dev-server": "^2.4.5"
```

The config/server.config.js is about the configure of the webpack-dev-server.


## eslint

If you want to learn more, you can visit the [eslint](http://eslint.org/)

### 1. What's the motivation?

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

### 2. How to lint without the files under some folders?
Using the .eslintignore file to not lint the files.

### 3. How to close/disable some rules?
Using the .eslintrc file to configure rules to open or close some rules.

```
"rules": {
    "max-len": [2, 120, 2],
    "object-property-newline": [0],
    "no-var": [2],
    "react/prop-types": [0]
}
```

### 4. How to use eslint in the WebStorm?
![webstorm-eslint-config.png](https://github.com/sym900728/react-scaffolding/blob/master/documents/images/webstorm-eslint-config.png)


# Ⅱ. React Redux

## Description



# Ⅲ. React Components

# Ⅳ. Optimizing


# react-scaffolding

React scaffolding is a react starter kit. You can use the scaffolding to set up your project quickly.

Watching the **[description](#description)** for more information.

Please forgive my poor english.


Taking a view about the scaffolding.

![home.png](https://github.com/sym900728/react-scaffolding/blob/master/documents/images/home.png)

## Description

Describing the ecosystem of react project. Listing many problems of react project and resolving these problems.

### node

Using node environment to develop react project.

### [babel](https://github.com/sym900728/react-scaffolding/blob/master/documents/Babel.md)

### [webpack](https://github.com/sym900728/react-scaffolding/blob/master/documents/Webpack.md)

### [eslint](https://github.com/sym900728/react-scaffolding/blob/master/documents/Eslint.md)

### [react router v3 and v4](https://github.com/sym900728/react-scaffolding/blob/master/documents/ReactRouterV3V4.md)

### [redux](https://github.com/sym900728/react-scaffolding/blob/master/documents/Redux.md)

### [redux saga](https://github.com/sym900728/react-scaffolding/blob/master/documents/ReduxSaga.md)

### [mobx](https://github.com/sym900728/react-scaffolding/blob/master/documents/Mobx.md)


## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Reference](#reference)

## Features
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [webpack2](https://webpack.js.org)
* [babel](https://github.com/babel/babel)
* [eslint](https://eslint.org)

## Requirements

* node `^7.9.0`
* yarn `^0.23.2` or npm `^4.2.0`

## Getting Started

After confirming that your development environment meets [requirements](#requirements), you can create a new project based on `react-scaffolding` by doing the following:

### Install from source

First, clone the project:

```bash
$ git https://github.com/sym900728/react-scaffolding.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.org) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install    # Install project dependencies
$ yarn start      # Compile and launch (same as `npm start`)
```

If everything works, you should see the following:

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`start:dev`|Same as `start`|
|`start:prod`|Serves your app at `localhost:3000` but it is production environment.|
|`compile`|Compiles the production application to disk (`~/dist` by default).|
|`compile:dev`|Compiles the development application to disk (`~/dist` by default).|
|`compile:prod`|Same as `compile`|
|`compile:analyze`|Compiles the production application to disk (`~/dist` by default) with source map for analyzing. [source-map-explorer](https://github.com/danvk/source-map-explorer)|
|`compile:analyze:dev`|Compiles development application to disk (`~/dist` by default) with source map for analyzing.|
|`compile:analyze:prod`|Same as `compile:analyze`|
|`test`|Runs jest tests|
|`clean`|Remove `~/dist` folder|
|`clean:dist`|Same as `clean`|
|`clean:node_modules`|Remove `~/node_modules` folder|
|`reinstall`|Remove `~/node_modules` folder, then run `yarn install`.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|


## Application Structure

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── src                      # Application source code
│   ├── assets               # Global Reusable assets
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── libs                 # Global library
│   ├── public               # Global public assets
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   └── Home             # Fractal route
│   │       ├── index.js     # ProductDetail route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── index.html           # Main HTML page container for app
│   └── index.js             # Application rendering
└── tests                    # Unit tests
```

## Reference

This scaffolding quotes from [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit)

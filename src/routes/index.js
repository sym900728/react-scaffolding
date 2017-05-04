import App from '../containers/AppContainer'

import Home from './Home'

import ProductsRoute from './Products'

const createRoutes = (store) => {
  return {
    path: '/',
    component: App,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      ProductsRoute(store),
    ]
  }
}

export default createRoutes

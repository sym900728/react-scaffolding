import App from '../containers/AppContainer'

import Home from './Home'

import ProductsRoute from './Products'
import AuthRoute from './Auth'

const createRoutes = (store) => {
  return [
    {
      component: App,
      routes: [
        {
          path: '/',
          exact: true,
          component: Home
        },
        ProductsRoute(store),
        AuthRoute(store)
      ]
    }
  ]
}


export default createRoutes

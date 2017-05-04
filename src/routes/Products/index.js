import { combineReducers } from 'redux'
import { injectReducer } from '~/store/reducers'

import config from '~/libs/api/config'

const redirectToLogin = (store) => (nextState, replace) => {
  if (localStorage.token) {
    config.headers = {headers: {'x-access-token': localStorage.token}}
  } else {
    replace('/auth/login')
  }
  // if (!store.getState().auth.isLogin) {
  //   replace('/auth/login')
  // }
}

export default (store) => ({
  path: 'products',
  // Async getComponent is only invoked when route matches
  // onEnter: redirectToLogin(store),

  getComponent (nextState, cb) {
    // Webpack - use 'require.ensure' to create a split point and embed an async module loader (jsonp) when bundling
    require.ensure([], (require) => {
      const ProductsContainer = require('./containers/ProductsContainer').default

      const gatherReducer = require('./routes/Gather').reducer

      const reducer = combineReducers({
        gather: gatherReducer
      })

      injectReducer(store, {key: 'products', reducer})
      // Return getComponent
      cb(null, ProductsContainer)
      // Webpack named bundle
    }, 'products')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      const GatherRoute = require('./routes/Gather').default
      cb(null, [
        GatherRoute(store)
      ])
    }, 'products')
  }
})

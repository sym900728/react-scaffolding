import { combineReducers } from 'redux'
import { injectReducer } from '~/store/reducers'

import asyncComponent from '~/components/asyncComponent'

import GatherRoute from './routes/Gather'

export default (store) => ({
  path: '/products',
  component: asyncComponent(() => {
    return new Promise(resolve => {
      require.ensure([], (require) => {
        const ProductsContainer = require('./containers/ProductsContainer').default

        const gatherReducer = require('./routes/Gather').reducer

        const reducer = combineReducers({
          gather: gatherReducer
        })

        injectReducer(store, {key: 'products', reducer})

        resolve(ProductsContainer)
      }, 'products')
    })
  }),
  routes: [
    GatherRoute(store)
  ]
})

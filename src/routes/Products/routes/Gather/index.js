import { combineReducers } from 'redux'
import asyncComponent from '~/components/asyncComponent'

import { reducer as dataReducer } from './modules/GatherModule'

const reducer = combineReducers({
  data: dataReducer
})

export { reducer }

export default (store) => ({
  path: '/products/gather',
  component: asyncComponent(() => {
    return new Promise(resolve => {
      require.ensure([], (require) => {
        const GatherContainer = require('./containers/GatherContainer').default

        resolve(GatherContainer)
      }, 'gather')
    })
  }),
})

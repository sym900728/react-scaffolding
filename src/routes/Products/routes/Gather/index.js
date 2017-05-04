import { combineReducers } from 'redux'

import { reducer as dataReducer } from './modules/GatherModule'

const reducer = combineReducers({
  data: dataReducer
})

export { reducer }

export default (store) => {
  return {
    path: 'gather',
    // Async getComponent is only invoked when route matches
    getIndexRoute (nextState, cb) {
      // Webpack - use 'require.ensure' to create a split point and embed an async module loader (jsonp) when bundling
      require.ensure([], (require) => {
        // Webpack - use require callback to define dependencies for bundling
        const GatherContainer = require('./containers/GatherContainer').default
        // Return getComponent
        cb(null, {
          component: GatherContainer
        })
        // Webpack named bundle
      }, 'gather')
    }
  }
}


import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
  const middleware = [thunk]

  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  if (__DEV__) {
    // const logger = require('redux-logger').default
    // middleware.push(logger)
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )

  return store
}

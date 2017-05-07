import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export default (initialState = {}) => {
  const middleware = [thunk]

  const history = createHistory()
  middleware.push(routerMiddleware(history))

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

  return {store, history}
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory } from 'react-router'
import createStore from './store/createStore'

const store = createStore()
store.asyncReducers = {}

const render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />
      </Provider>
    </AppContainer>
  , document.getElementById('root')
  )
}

if (__DEV__ && module.hot) {
  module.hot.accept('./store/reducers', () => {
    const nextStore = require('./store/reducers')
    store.replaceReducer(nextStore())
  })

  module.hot.accept('./routes/index', () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'))
      render()
    })
  })
}

render()

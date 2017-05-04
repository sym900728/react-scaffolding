import { Record } from 'immutable'
import apiFactory from '~/libs/api/apiFactory'

import { prompt } from '~/components/Prompt'

const api = apiFactory()

const APP_LOGIN_REQUEST = 'APP_LOGIN_REQUEST'
const APP_LOGIN_SUCCESS = 'APP_LOGIN_SUCCESS'
const APP_LOGIN_FAILURE = 'APP_LOGIN_FAILURE'

const APP_LOGOUT_REQUEST = 'APP_LOGOUT_REQUEST'
const APP_LOGOUT_SUCCESS = 'APP_LOGOUT_SUCCESS'
const APP_LOGOUT_FAILURE = 'APP_LOGOUT_FAILURE'

/* =============================================== actions ===================================================== */
/**
 * login
 */
const login = (username, password, callback) => (dispatch) => {
  dispatch({type: APP_LOGIN_REQUEST})
  return api.login(username, password).then(value => {
    if (value.data.success) {
      callback()
      dispatch({type: APP_LOGIN_SUCCESS})
    } else {
      prompt.show('登录失败', 'danger', 1500)
      dispatch({type: APP_LOGIN_FAILURE})
    }
    return value
  }).catch(error => {
    prompt.show('登录失败', 'danger', 1500)
    dispatch({type: APP_LOGIN_FAILURE, payload: {error}})
    throw error
  })
}

/**
 * logout
 */
const logout = (callback) => (dispatch) => {
  dispatch({type: APP_LOGOUT_REQUEST})
  delete localStorage.token
  return api.logout().then(value => {
    if (value.data.success) {
      dispatch({type: APP_LOGOUT_SUCCESS})
    } else {
      dispatch({type: APP_LOGOUT_FAILURE})
    }
    callback()
    return value
  }).catch(error => {
    callback()
    dispatch({type: APP_LOGOUT_FAILURE})
    throw error
  })
}

export const actions = {
  login,
  logout
}
/* ============================================ initial state ================================================== */
const InitialState = Record({
  isFetching: false,
  isLogin: false
})

const initialState = new InitialState()
/* =============================================== reducer ===================================================== */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOGIN_REQUEST:
      return state.setIn(['isFetching'], true)
    case APP_LOGIN_SUCCESS:
      return state.setIn(['isLogin'], true)
        .setIn(['isFetching'], false)
    case APP_LOGIN_FAILURE:
      return state.setIn(['isFetching'], false)

    case APP_LOGOUT_REQUEST:
      return state.setIn(['isFetching'], true)
    case APP_LOGOUT_SUCCESS:
      return initialState
    case APP_LOGOUT_FAILURE:
      return initialState
  }
  return state
}

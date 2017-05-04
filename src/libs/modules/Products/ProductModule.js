import { Record } from 'immutable'
import apiFactory from '~/libs/api/apiFactory'

const api = apiFactory()

const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST'
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE'

const COPY_PRODUCT_REQUEST = 'COPY_PRODUCT_REQUEST'
const COPY_PRODUCT_SUCCESS = 'COPY_PRODUCT_SUCCESS'
const COPY_PRODUCT_FAILURE = 'COPY_PRODUCT_FAILURE'

const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST'
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS'
const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE'

const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST'
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE'

const EMPTY_PRODUCT_CACHE = 'EMPTY_PRODUCT_CACHE'
/* =============================================== actions ===================================================== */
/**
 * get product by id
 */
const getProduct = (prefix) => (id) => (dispatch) => {
  dispatch({type: prefix + '_' + GET_PRODUCT_REQUEST})
  return api.products.one.get(id).then(value => {
    let product = value.data.data
    if (value.data.success) {
      dispatch({type: prefix + '_' + GET_PRODUCT_SUCCESS, payload: {product}})
    } else {
      dispatch({type: prefix + '_' + GET_PRODUCT_FAILURE})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + GET_PRODUCT_FAILURE, payload: { error }})
    throw error
  })
}

/**
 * copy product
 */
const copyProduct = (prefix) => (id) => (dispatch) => {
  dispatch({type: prefix + '_' + COPY_PRODUCT_REQUEST})
  return api.products.one.post(id).then(value => {
    if (value.data.success) {
      dispatch({type: prefix + '_' + COPY_PRODUCT_SUCCESS})
    } else {
      dispatch({type: prefix + '_' + COPY_PRODUCT_FAILURE})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + COPY_PRODUCT_FAILURE})
    throw error
  })
}

/**
 * update product
 */
const updateProduct = (prefix) => (id, data) => (dispatch) => {
  dispatch({type: prefix + '_' + UPDATE_PRODUCT_REQUEST})
  return api.products.one.put(id, data).then(value => {
    if (value.data.success) {
      dispatch({type: prefix + '_' + UPDATE_PRODUCT_SUCCESS})
    } else {
      dispatch({type: prefix + '_' + UPDATE_PRODUCT_FAILURE})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + UPDATE_PRODUCT_FAILURE})
    throw error
  })
}

/**
 * delete product
 */
const deleteProduct = (prefix) => (id) => (dispatch) => {
  dispatch({type: prefix + '_' + DELETE_PRODUCT_REQUEST})
  return api.products.one.delete(id).then(value => {
    dispatch({type: prefix + '_' + DELETE_PRODUCT_SUCCESS})
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + DELETE_PRODUCT_FAILURE})
    throw error
  })
}

/**
 * empty product cache
 */
const emptyCache = (prefix) => () => (dispatch) => {
  dispatch({type: prefix + '_' + EMPTY_PRODUCT_CACHE})
}

export const actions = {
  getProduct,
  copyProduct,
  updateProduct,
  deleteProduct,
  emptyCache
}
/* ============================================ initial state ================================================== */

const InitialState = Record({
  isFetching: false,
  product: null,
  isUpdating: false,
})

const initialState = new InitialState()
/* =============================================== reducer ===================================================== */
export const reducer = (prefix) => (state = initialState, action) => {
  switch (action.type) {
    case prefix + '_' + GET_PRODUCT_REQUEST:
      return state.setIn(['isFetching'], true)
    case prefix + '_' + GET_PRODUCT_SUCCESS:
      return state.setIn(['product'], action.payload.product)
        .setIn(['isFetching'], false)
    case prefix + '_' + GET_PRODUCT_FAILURE:
      return state.setIn(['isFetching'], false)

    case prefix + '_' + COPY_PRODUCT_REQUEST:
      return state
    case prefix + '_' + COPY_PRODUCT_SUCCESS:
      return state
    case prefix + '_' + COPY_PRODUCT_FAILURE:
      return state

    case prefix + '_' + UPDATE_PRODUCT_REQUEST:
      return state.setIn(['isUpdating'], true)
    case prefix + '_' + UPDATE_PRODUCT_SUCCESS:
      return state.setIn(['isUpdating'], false)
    case prefix + '_' + UPDATE_PRODUCT_FAILURE:
      return state.setIn(['isUpdating'], false)

    case prefix + '_' + DELETE_PRODUCT_REQUEST:
      return state
    case prefix + '_' + DELETE_PRODUCT_SUCCESS:
      return state
    case prefix + '_' + DELETE_PRODUCT_FAILURE:
      return state

    case prefix + '_' + EMPTY_PRODUCT_CACHE:
      return initialState
  }
  return state
}

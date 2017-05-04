import { Record } from 'immutable'
import apiFactory from '~/libs/api/apiFactory'
import { generateQueryString } from '~/libs/utils/StringUtil'

const api = apiFactory()

const GATHER_PRODUCTS_REQUEST = 'GATHER_PRODUCTS_REQUEST'
const GATHER_PRODUCTS_SUCCESS = 'GATHER_PRODUCTS_SUCCESS'
const GATHER_PRODUCTS_FAILURE = 'GATHER_PRODUCTS_FAILURE'

const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST'
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

const UPDATE_PRODUCTS_REQUEST = 'UPDATE_PRODUCTS_REQUEST'
const UPDATE_PRODUCTS_SUCCESS = 'UPDATE_PRODUCTS_SUCCESS'
const UPDATE_PRODUCTS_FAILURE = 'UPDATE_PRODUCTS_FAILURE'

const DELETE_PRODUCTS_REQUEST = 'DELETE_PRODUCTS_REQUEST'
const DELETE_PRODUCTS_SUCCESS = 'DELETE_PRODUCTS_SUCCESS'
const DELETE_PRODUCTS_FAILURE = 'DELETE_PRODUCTS_FAILURE'

const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST'
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE'

const EMPTY_PRODUCTS_CACHE = 'EMPTY_PRODUCTS_CACHE'
/* =============================================== actions ===================================================== */
/**
 * gather products
 */
const gatherProducts = (prefix) => (data) => (dispatch) => {
  dispatch({type: prefix + '_' + GATHER_PRODUCTS_REQUEST})
  return api.products.put(data).then(value => {
    let gatherProducts = value.data.data
    if (value.data.success) {
      dispatch({type: prefix + '_' + GATHER_PRODUCTS_SUCCESS, payload: {gatherProducts}})
    } else {
      dispatch({type: prefix + '_' + GATHER_PRODUCTS_FAILURE, payload: value.data})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + GATHER_PRODUCTS_FAILURE, payload: { error }})
    throw error
  })
}

/**
 * get products
 */
const getProducts = (prefix) => (args) => (dispatch) => {
  dispatch({type: prefix + '_' + GET_PRODUCTS_REQUEST})
  let queryString = generateQueryString(args)
  return api.products.get(queryString).then(value => {
    let products = value.data.data
    let total = value.data.total
    if (value.data.success) {
      dispatch({type: prefix + '_' + GET_PRODUCTS_SUCCESS, payload: {products, total}})
    } else {
      dispatch({type: prefix + '_' + GET_PRODUCTS_FAILURE})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + GET_PRODUCTS_FAILURE, payload: {error}})
    throw error
  })
}

/**
 * delete products
 */
const deleteProducts = (prefix) => (args) => (dispatch) => {
  dispatch({type: prefix + '_' + DELETE_PRODUCTS_REQUEST})
  let data = {operation: 'delete', data: args}
  return api.products.put(data).then(value => {
    if (value.data.success) {
      dispatch({type: prefix + '_' + DELETE_PRODUCTS_SUCCESS})
    } else {
      dispatch({type: prefix + '_' + DELETE_PRODUCTS_FAILURE})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + DELETE_PRODUCTS_FAILURE})
    throw error
  })
}

/**
 * create product
 */
const createProduct = (prefix) => (args) => (dispatch) => {
  dispatch({type: prefix + '_' + CREATE_PRODUCT_REQUEST})
  return api.products.post(args).then(value => {
    dispatch({type: prefix + '_' + CREATE_PRODUCT_SUCCESS})
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + CREATE_PRODUCT_FAILURE, payload: {error}})
    throw error
  })
}

/**
 * update products
 */
const updateProducts = (prefix) => (operation, args) => (dispatch) => {
  let data = {operation: operation, data: args}
  dispatch({type: prefix + '_' + UPDATE_PRODUCTS_REQUEST})
  return api.products.put(data).then(value => {
    if (value.data.success) {
      dispatch({type: prefix + '_' + UPDATE_PRODUCTS_SUCCESS})
    } else {
      dispatch({type: prefix + '_' + UPDATE_PRODUCTS_FAILURE})
    }
    return value
  }).catch(error => {
    dispatch({type: prefix + '_' + UPDATE_PRODUCTS_FAILURE})
    throw error
  })
}

/**
 * empty cache
 */
const emptyCache = (prefix) => () => (dispatch) => {
  dispatch({type: prefix + '_' + EMPTY_PRODUCTS_CACHE})
}

export const actions = {
  getProducts,
  gatherProducts,
  createProduct,
  deleteProducts,
  updateProducts,
  emptyCache
}
/* ============================================ initial state ================================================== */
const InitialState = Record({
  isUpdating: false,
  isGathering: false,
  isFetching: false,
  products: [],
  gatherProducts: [],
  total: 0
})

const initialState = new InitialState()
/* =============================================== reducer ===================================================== */
export const reducer = (prefix) => (state = initialState, action) => {
  switch (action.type) {
    case prefix + '_' + GET_PRODUCTS_REQUEST:
      return state.setIn(['isFetching'], true)
    case prefix + '_' + GET_PRODUCTS_SUCCESS:
      return state.setIn(['products'], action.payload.products)
        .setIn(['total'], action.payload.total)
        .setIn(['isFetching'], false)
    case prefix + '_' + GET_PRODUCTS_FAILURE:
      return state.setIn(['isFetching'], false)

    case prefix + '_' + GATHER_PRODUCTS_REQUEST:
      return state.setIn(['isGathering'], true)
    case prefix + '_' + GATHER_PRODUCTS_SUCCESS:
      return state.setIn(['isGathering'], false)
        .setIn(['gatherProducts'], action.payload.gatherProducts)
    case prefix + '_' + GATHER_PRODUCTS_FAILURE:
      return state.setIn(['isGathering'], false)

    case prefix + '_' + CREATE_PRODUCT_REQUEST:
      return state
    case prefix + '_' + CREATE_PRODUCT_SUCCESS:
      return state
    case prefix + '_' + CREATE_PRODUCT_FAILURE:
      return state

    case prefix + '_' + UPDATE_PRODUCTS_REQUEST:
      return state.setIn(['isUpdating'], true)
    case prefix + '_' + UPDATE_PRODUCTS_SUCCESS:
      return state.setIn(['isUpdating'], false)
    case prefix + '_' + UPDATE_PRODUCTS_FAILURE:
      return state.setIn(['isUpdating'], false)

    case prefix + '_' + EMPTY_PRODUCTS_CACHE:
      return initialState
  }
  return state
}

import { prompt } from '~/components/Prompt'
import {
  actions as productsActions,
  reducer as productsReducer
} from '~/libs/modules/Products/ProductsModule'

import {
  actions as productActions
} from '~/libs/modules/Products/ProductModule'

const prefix = 'GATHER'
/* =============================================== actions ===================================================== */
/**
 * gather products
 * @param args
 * @param query
 */
const gatherProducts = (args, query, context) => (dispatch) => {
  let data = {operation: 'crawl', data: args}
  productsActions.gatherProducts(prefix)(data)(dispatch).then(value => {
    prompt.show('采集成功：' + value.data.successTotal + ', 采集失败了：' + value.data.errorTotal, 'success', 1500)
    context.setStateDefault()
    dispatch(getProducts(query))
  }).catch(() => {
    prompt.show('商品采集失败', 'danger', 1500)
  })
}

/**
 * get products
 * @param args
 */
const getProducts = (args) => (dispatch) => {
  productsActions.getProducts(prefix)(args)(dispatch).then(value => {
    if (!value.data.success) {
      prompt.show(value.data.message, 'danger', 1500)
    }
  }).catch(() => {
    prompt.show('获取商品失败', 'danger', 1500)
  })
}

/**
 * 合并商品
 * @param ids
 * @param query
 */
const mergeProducts = (ids, query) => (dispatch) => {
  productsActions.updateProducts(prefix)('union', ids)(dispatch).then(value => {
    if (value.data.success) {
      prompt.show('合并商品成功', 'success', 1500)
      dispatch(getProducts(query))
    } else {
      prompt.show(value.data.message, 'danger', 1500)
    }
  }).catch(() => {
    prompt.show('合并商品失败', 'danger', 1500)
  })
}

/**
 * delete product
 * when delete product success, then get products
 * @param id
 * @param query
 */
const deleteProduct = (id, query) => (dispatch) => {
  productActions.deleteProduct(prefix)(id)(dispatch).then(value => {
    if (value.data.success) {
      prompt.show('删除商品成功', 'success', 1500)
      dispatch(getProducts(query))
    } else {
      prompt.show(value.data.message, 'danger', 1500)
    }
  }).catch(() => {
    prompt.show('删除商品失败', 'danger', 1500)
  })
}

/**
 * delete products
 * @param ids
 * @param query
 */
const deleteProducts = (ids, query) => (dispatch) => {
  productsActions.deleteProducts(prefix)(ids)(dispatch).then(value => {
    if (value.data.success) {
      dispatch(getProducts(query))
    } else {
      prompt.show(value.data.message, 'danger', 1500)
    }
  }).catch(() => {
    prompt.show('批量删除商品失败', 'danger', 1500)
  })
}

export const actions = {
  gatherProducts,
  getProducts,
  mergeProducts,
  deleteProduct,
  deleteProducts,
  emptyCache: productsActions.emptyCache(prefix)
}

/* =============================================== reducer ===================================================== */
export const reducer = productsReducer(prefix)

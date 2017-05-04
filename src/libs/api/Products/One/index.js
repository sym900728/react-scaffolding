import axios from '~/libs/api/axios'

/**
 * Product
 */
export default class Product {
  constructor (baseUrl) {
    this.url = baseUrl + '/{productId}'
  }

  get (productId) {
    return axios.get(this.url.replace('{productId}', productId))
  }

  put (productId, data) {
    return axios.put(this.url.replace('{productId}', productId), data)
  }

  delete (productId) {
    return axios.delete(this.url.replace('{productId}', productId))
  }
}

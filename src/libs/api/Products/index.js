import axios from '~/libs/api/axios'

import Product from './One'

/**
 * Products
 */
export default class Products {
  constructor (baseUrl) {
    this.url = baseUrl + '/products'
    this.one = new Product(this.url)
  }

  url = ''
  one = null

  get (query) {
    return axios.get(this.url + query)
  }

  post (data) {
    return axios.post(this.url, data)
  }

  put (data) {
    return axios.put(this.url, data)
  }

  delete (data) {
    return axios.delete(this.url, data)
  }
}

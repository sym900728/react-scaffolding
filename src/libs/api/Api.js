import axios from 'axios'

import config from '~/libs/api/config'

import Products from './Products'

/**
 * Api
 */
export default class Api {
  constructor (baseUrl) {
    this.url = baseUrl
    this.products = new Products(baseUrl)
  }

  url = ''
  products = null

  login (username, password) {
    let url = ''
    return axios.get(url).then(value => {
      if (value.data.success) {
        config.headers = {headers: {'x-access-token': value.data.data}}
        localStorage.token = value.data.data
      }
      return value
    }).catch(error => {
      throw error
    })
  }

  logout () {
    let url = this.url + '/admins/logout'
    return axios.get(url, config.headers).then(value => {
      return value
    }).catch(error => {
      throw error
    })
  }
}

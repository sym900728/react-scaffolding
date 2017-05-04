import ax from 'axios'

import config from './config'

class Axios {
  get (query) {
    return ax.get(query, config.headers)
  }

  post (url, data) {
    return ax.post(url, data, config.headers)
  }

  put (url, data) {
    return ax.put(url, data, config.headers)
  }

  delete (url, data) {
    if (data) {
      return ax.delete(url, data, config.headers)
    } else {
      return ax.delete(url, config.headers)
    }
  }
}

const axios = new Axios()

export default axios

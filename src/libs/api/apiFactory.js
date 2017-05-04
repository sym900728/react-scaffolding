import Api from './Api'
import config from './config'

let api = null

export default function apiFactory () {
  if (!api) {
    api = new Api(config.baseUrl)
  }
  return api
}

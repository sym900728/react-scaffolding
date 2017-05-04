'use strict'

/**
 * trim string, delete front space and end space
 * @param str
 */
export const trimString = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * true: trimmed string empty; false: trimmed string is not empty
 * @param str
 */
export const isTrimmedEmpty = (str) => {
  if (str.replace(/(^\s*)|(\s*$)/g, '') === '') {
    return true
  } else {
    return false
  }
}

/**
 * true: is english; false: is not english
 * @param str
 * @returns {boolean}
 */
export const isEnglish = (str) => {
  if (str.replace(/[\w\s]/g, '') === '') {
    return true
  } else {
    return false
  }
}

/**
 * generate query string
 * @param args
 * @returns {string}
 */
export const generateQueryString = (args) => {
  let queryString = ''
  if (args) {
    for (let key of Object.keys(args)) {
      if (!queryString) {
        queryString = '?' + key + '=' + args[key]
      } else {
        queryString += '&' + key + '=' + args[key]
      }
    }
  }
  return queryString
}

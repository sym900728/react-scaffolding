'use strict'

export const getValueBeforeDecimal = (value) => {
  let v = parseInt(value)
  if (isNaN(v)) {
    return 0
  } else {
    return v
  }
}

export const getTwoDigitsBehindDecimal = (value) => {
  let splitValue = value.toString().split('.')
  if (splitValue[1]) {
    if (splitValue[1].toString().length === 1) {
      return splitValue[1].toString() + '0'
    } else {
      return splitValue[1].toString()
    }
  } else {
    return '00'
  }
}

export const changedTowDecimals = (value) => {
  let splitValue = value.toString().split('.')
  let decimals = ''
  if (splitValue[1]) {
    if (splitValue[1].toString().length === 1) {
      decimals = splitValue[1].toString() + '0'
    } else {
      decimals = splitValue[1].toString()
    }
  } else {
    decimals = '00'
  }
  let integers = getValueBeforeDecimal(value)
  return integers.toString() + '.' + decimals
}

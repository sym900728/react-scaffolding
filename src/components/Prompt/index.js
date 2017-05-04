import React from 'react'
import ReactDOM from 'react-dom'

import Toast from './Toast'

const promptWrapperId = 'prompt-wrapper'
const defaultTimeout = 1500
const animationDuration = 300

/**
 * Prompt
 */
export default class Prompt extends React.Component {
  render () {
    return (
      <div id={promptWrapperId} />
    )
  }
}

const showToast = (text, type, timeout) => {
  ReactDOM.render(
    <Toast text={text} timeout={timeout} type={type} />,
    document.getElementById(promptWrapperId)
  )
}

const hideToast = () => {
  ReactDOM.unmountComponentAtNode(document.getElementById(promptWrapperId))
}

const show = (text, type, timeout) => {
  if (!document.getElementById(promptWrapperId).hasChildNodes()) {
    let renderTimeout = timeout

    if (!renderTimeout) {
      renderTimeout = defaultTimeout
    }

    showToast(text, type, renderTimeout)

    if (timeout <= 0) {
      return false
    }

    setTimeout(() => {
      hideToast()
    }, renderTimeout + animationDuration)
    return true
  }
  return false
}

export const prompt = { show }

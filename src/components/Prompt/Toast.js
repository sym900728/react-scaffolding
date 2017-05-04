import React from 'react'
import assign from 'object-assign'

const animationDuration = 300
/**
 * Toast
 */
export default class Toast extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      containerStyles: null
    }
  }

  componentDidMount () {
    this.setState({containerStyles: this.getStyles()})
    this.getVisibleState(this)
  }

  updateStyle (base, update) {
    this.setState({containerStyles: assign({}, base, update)})
  }

  getVisibleState (context) {
    let base = this.getStyles()

    setTimeout(() => {
      context.updateStyle(base, styles.show)
    }, 100)

    if (this.props.timeout <= 0) {
      return
    }

    setTimeout(() => {
      context.updateStyle(base, styles.hide)
    }, this.props.timeout)
  }

  getStyles () {
    let style = {}
    switch (this.props.type) {
      case 'success':
        style = assign({}, styles.base, styles.success)
        break
      case 'danger':
        style = assign({}, styles.base, styles.danger)
        break
      case 'warning':
        style = assign({}, styles.base, styles.warning)
        break
      case 'info':
        style = assign({}, styles.base, styles.info)
        break
      default:
        style = assign({}, styles.base, styles.info)
        break
    }
    return style
  }

  render () {
    return (
      <div style={this.state.containerStyles}>
        <span>
          <strong>{this.props.text}</strong>
        </span>
      </div>
    )
  }
}

const styles = {
  base: {
    position: 'fixed',
    width: '250px',
    margin: '0 auto',
    right: '0px',
    bottom: '-50px',
    left: '0px',
    textAlign: 'center',
    zIndex: '999',
    pointerEvents: 'none',
    padding: '10px',
    transition: 'all ' + animationDuration + 'ms ease',
    transform: 'translateY(0px)',
    // Vendor Prefixes
    msTransition: 'all ' + animationDuration + 'ms ease',
    msTransform: 'translateY(0px)',
    WebkitTransition: 'all ' + animationDuration + 'ms ease',
    WebkitTransform: 'translateY(0px)',
    OTransition: 'all ' + animationDuration + 'ms ease',
    OTransform: 'translateY(0px)',
    MozTransition: 'all ' + animationDuration + 'ms ease',
    MozTransform: 'translateY(0px)'
  },

  show: {
    transform: 'translateY(-100px)',
    msTransform: 'translateY(-100px)',
    WebkitTransform: 'translateY(-100px)',
    OTransform: 'translateY(-100px)',
    MozTransform: 'translateY(-100px)'
  },

  hide: {
    transform: 'translateY(100px)',
    msTransform: 'translateY(100px)',
    WebkitTransform: 'translateY(100px)',
    OTransform: 'translateY(100px)',
    MozTransform: 'translateY(100px)'
  },

  info: {
    backgroundColor: '#d9edf7',
    border: '1px solid #bce8f1',
    color: '#31708f'
  },

  success: {
    backgroundColor: '#dff0d8',
    border: '1px solid #d6e9c6',
    color: '#3c763d'
  },

  warning: {
    backgroundColor: '#fcf8e3',
    border: '1px solid #faebcc',
    color: '#8a6d3b'
  },

  danger: {
    backgroundColor: '#f2dede',
    border: '1px solid #ebccd1',
    color: '#a94442'
  }
}

import React from 'react'

let firstRoute = true

const asyncComponent = (getComponent) => class AsyncComponent extends React.Component {

  static Component = null

  mounted = false
  state = {
    Component: AsyncComponent.Component
  }

  componentDidMount () {
    this.mounted = true
    if (this.state.Component === null) {
      if (!firstRoute) {
        // progress start
      }

      getComponent().then(Component => {
        if (firstRoute) {
          firstRoute = false
        } else {
          // progress done
        }
        AsyncComponent.Component = Component
        if (this.mounted) {
          this.setState({ Component })
        }
      })
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  render () {
    const { Component } = this.state
    if (Component) {
      return <Component {...this.props} />
    } else {
      return null
    }
  }
}

export default asyncComponent

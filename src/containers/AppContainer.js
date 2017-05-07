import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppHeader from '../components/App/AppHeader'
import AppFooter from '../components/App/AppFooter'

import { actions as authActions } from '../modules/AuthModule'

import { renderRoutes } from 'react-router-config'

const actions = {...authActions}
/**
 * App Container
 */
class AppContainer extends Component {
  render () {
    console.log('====== AppContainer =======')
    console.log(this.props)
    return (
      <div>
        <AppHeader history={this.props.history} />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

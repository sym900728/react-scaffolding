import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Prompt from '~/components/Prompt'

import ConfirmModal from '../components/Modal/ConfirmModal'

import AppHeader from '../components/App/AppHeader'
import AppFooter from '../components/App/AppFooter'

import { actions as authActions } from '../modules/AuthModule'

const actions = {...authActions}
/**
 * App Container
 */
class AppContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showConfirmModal: false
    }
    this.logout = this.logout.bind(this)
    this.confirm = this.confirm.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  logout () {
    this.refs['CONFIRM_MODAL'].open()
  }

  confirm () {
    this.props.actions.logout(this.redirectToLogin)
  }

  redirectToLogin () {
    this.props.router.push('/auth/login')
  }

  render () {
    let route = this.props.router.location.pathname
    return (
      <div>
        <ConfirmModal
          ref={'CONFIRM_MODAL'}
          title={'确定退出系统吗？'}
          confirm={this.confirm} />
        {this.renderAppHeader(route)}
        {this.renderChildren(route)}
        {this.renderAppFooter(route)}
        <Prompt />
      </div>
    )
  }

  renderAppHeader (route) {
    if (route === '/' || route === '/auth/login') {
      return null
    } else {
      return <AppHeader router={this.props.router} logout={this.logout} />
    }
  }

  renderAppFooter (route) {
    if (route === '/' || route === '/auth/login') {
      return null
    } else {
      return <AppFooter router={this.props.router} />
    }
  }

  renderChildren (route) {
    if (route === '' || route === '/auth/login') {
      return this.props.children
    } else {
      return <div style={{paddingTop: '70px'}}>{this.props.children}</div>
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

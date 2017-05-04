import React from 'react'

import {
  Breadcrumb as BootstrapBreadcrumb
} from 'react-bootstrap'

/**
 * Gather Breadcrumb
 */
export default class Breadcrumb extends React.Component {
  constructor (props) {
    super(props)
    this.goToHome = this.goToHome.bind(this)
  }

  goToHome () {
    this.props.router.push('/products')
  }

  render () {
    return (
      <BootstrapBreadcrumb>
        <BootstrapBreadcrumb.Item onClick={this.goToHome}>
          首页
        </BootstrapBreadcrumb.Item>
        <BootstrapBreadcrumb.Item active>
          数据采集
        </BootstrapBreadcrumb.Item>
      </BootstrapBreadcrumb>
    )
  }
}

import React from 'react'
import { renderRoutes } from 'react-router-config'

/**
 * Products Container
 */
export default class ProductsContainer extends React.Component {
  render () {
    console.log('=== Products Container ===')
    return (
      <div style={{marginTop: '70px'}}>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

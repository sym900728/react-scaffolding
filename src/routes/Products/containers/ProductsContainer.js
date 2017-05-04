import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Products Container
 */
class ProductsContainer extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)

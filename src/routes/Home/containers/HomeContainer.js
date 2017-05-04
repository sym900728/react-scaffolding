import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Home Container
 */
class HomeContainer extends React.Component {
  componentWillMount () {
    this.props.router.replace('/products')
  }

  render () {
    return (
      <div />
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

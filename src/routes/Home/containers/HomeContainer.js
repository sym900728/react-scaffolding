import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Home Container
 */
class HomeContainer extends React.Component {
  render () {
    return (
      <div style={{marginTop: '70px'}}>
        <h1>================= Home =================</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

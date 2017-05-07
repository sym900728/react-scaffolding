import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * Auth Container
 */
class AuthContainer extends React.Component {
  render () {
    console.log('======= auth container ==========')
    return (
      <div style={{marginTop: '100px'}}>
        <h1>=============This is Auth Container==============</h1>
        <h1><Link to='/'>Go To Root</Link></h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)

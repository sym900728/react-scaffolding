import React from 'react'

import {
  Modal
} from 'react-bootstrap'

import Loading from './Loading'

/**
 * Loading Modal
 */
export default class LoadingModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool
  }

  static defaultProps = {
    show: true
  }

  render () {
    return (
      <Modal
        show={this.props.show}
        dialogComponentClass={() => (<LoadingModalBody show={this.props.show} />)} />
    )
  }
}

class LoadingModalBody extends React.Component {
  render () {
    return (
      <div tabIndex='-1' className='fade in modal' style={{top: '40%', display: 'block'}}>
        <div style={{width: '64px', margin: '0 auto'}}>
          <Loading show={this.props.show} color={'#4582C7'} />
        </div>
      </div>
    )
  }
}

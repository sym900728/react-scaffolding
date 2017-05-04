import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
 * Delete Modal
 */
export default class DeleteModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    this.cancel = this.cancel.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  static propTypes = {
    title: React.PropTypes.string,
    cancel: React.PropTypes.func,
    confirm: React.PropTypes.func
  }

  static defaultProps = {
    title: '',
    cancel: () => {},
    confirm: () => {}
  }

  open () {
    this.setState({show: true})
  }

  close () {
    this.setState({show: false})
  }

  cancel () {
    this.close()
    this.props.cancel()
  }

  confirm () {
    this.setState({show: false})
    this.props.confirm()
  }

  render () {
    return (
      <Modal
        bsSize={'small'}
        show={this.state.show}
        onHide={this.cancel}>
        <Modal.Header>
          <Modal.Title >操作</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            {this.props.title}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.cancel}>取消</Button>
          <Button bsStyle='primary' onClick={this.confirm}>确认</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

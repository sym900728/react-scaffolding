import React from 'react'
import _ from 'lodash'

import { prompt } from '~/components/Prompt'

import {
  Modal,
  Button
} from 'react-bootstrap'

/**
 * Shops Modal
 */
export default class ShopsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      shops: []
    }
    this.close = this.close.bind(this)
    this.confirm = this.confirm.bind(this)
    this.selectShop = this.selectShop.bind(this)
  }

  injectSelect (shops) {
    let temp = []
    if (shops) {
      shops.map(value => {
        if (value.grantSuccess) {
          let shop = _.clone(value)
          shop.isSelected = false
          temp.push(shop)
        }
      })
    }
    return temp
  }

  open (shops) {
    this.setState({show: true, shops: this.injectSelect(shops)})
  }

  close () {
    this.setState({show: false})
  }

  selectShop (shop) {
    this.state.shops.map(value => {
      if (value.id === shop.id) {
        if (value.isSelected) {
          value.isSelected = false
        } else {
          value.isSelected = true
        }
      }
    })
    this.setState({shops: this.state.shops})
  }

  confirm () {
    let shops = _.filter(this.state.shops, (value) => {
      return value.isSelected
    })
    if (shops.length !== 0) {
      this.props.confirm(shops)
      this.setState({show: false})
    } else {
      prompt.show('至少选中一个店铺', 'danger', 1500)
    }
  }

  render () {
    return (
      <Modal show={this.state.show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>店铺</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderShops()}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='default' onClick={this.close}>取消</Button>
          <Button bsStyle='primary' onClick={this.confirm}>发布</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  renderShops () {
    let views = []
    this.state.shops.map((value, index) => {
      views.push(
        <Shop
          key={index}
          shop={value}
          selectShop={this.selectShop} />
      )
    })
    return views
  }
}

/**
 * Shop
 */
class Shop extends React.Component {
  constructor (props) {
    super(props)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  handleCheckbox () {
    this.props.selectShop(this.props.shop)
  }

  render () {
    return (
      <div style={{display: 'inline-block'}}>
        <input
          type='checkbox'
          checked={this.props.shop.isSelected}
          onChange={this.handleCheckbox} />
        <span style={{paddingLeft: '5px', paddingRight: '10px'}}>
          {this.props.shop.name}
        </span>
      </div>
    )
  }
}

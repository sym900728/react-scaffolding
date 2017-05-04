import React from 'react'
import moment from 'moment'

import {
  Button
} from 'react-bootstrap'

import ConfirmModal from '~/components/Modal/ConfirmModal'
import ShopsModal from './ShopsModal'

import styles from './ProductList.scss'

/**
 * Product List Item
 */
export default class ProductListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '确定删除该商品？'
    }
    this.confirm = this.confirm.bind(this)
    this.handleClickOrigin = this.handleClickOrigin.bind(this)
    this.goToEditProduct = this.goToEditProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.addToWish = this.addToWish.bind(this)
    this.copyProduct = this.copyProduct.bind(this)
    this.addToWaitingToPublish = this.addToWaitingToPublish.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
    this.openShopsModal = this.openShopsModal.bind(this)
    this.publishProduct = this.publishProduct.bind(this)
  }

  static propsTypes = {
    shops: React.PropTypes.array
  }

  static defaultProps = {
    shops: []
  }

  handleClickOrigin () {
    if (this.props.product.url) {
      window.open(this.props.product.url, 'newWindow')
    }
  }

  goToEditProduct () {
    this.props.goToEditProduct(this.props.product.id)
  }

  deleteProduct () {
    this.refs['CONFIRM_MODAL'].open()
  }

  confirm () {
    switch (this.state.title) {
      case '确定删除该商品？':
        this.props.deleteProduct(this.props.product.id)
        break
    }
  }

  handleCheck () {
    this.props.select(this.props.product.id)
  }

  addToWish () {
    this.props.addToWish(this.props.product.id)
  }

  copyProduct () {
    this.props.copyProduct(this.props.product.id)
  }

  addToWaitingToPublish () {
    this.props.addToWaitingToPublish(this.props.product.id)
  }

  render () {
    switch (this.props.type) {
      case 'gather':
        return this.renderGatherItem()
      case 'repository':
        return this.renderRepositoryItem()
      case 'listing':
        return this.renderListingItem()
      case 'management':
        return this.renderManagementItem()
    }
  }

  renderConfirmModal () {
    return (
      <ConfirmModal ref={'CONFIRM_MODAL'} title={this.state.title} confirm={this.confirm} />
    )
  }

  renderCheckbox () {
    let isSelected = this.props.product.isSelected
    return (
      <td className='text-center'>
        <input type='checkbox' checked={isSelected} onChange={this.handleCheck} />
      </td>
    )
  }

  handleImageError (event) {
    event.target.src = require('~/assets/images/default.jpg')
  }

  renderImage () {
    let imagePath = null
    if (this.props.product.mainImage) {
      if (this.props.product.mainImage.smallImagePath) {
        imagePath = this.props.product.mainImage.smallImagePath
      } else {
        imagePath = require('~/assets/images/default.jpg')
      }
    } else {
      imagePath = require('~/assets/images/default.jpg')
    }
    return (
      <td>
        <img src={imagePath} className={styles['body-item-image']} onError={this.handleImageError} />
      </td>
    )
  }

  renderProductName () {
    return (
      <td style={{verticalAlign: 'top'}}>{this.props.product.name}</td>
    )
  }

  renderPrice () {
    return (
      <td className='text-center'>{this.props.product.price}</td>
    )
  }

  renderOrigin () {
    return (
      <td className='text-center'>
        <a onClick={this.handleClickOrigin} style={{cursor: 'pointer'}}>
          {this.props.product.sourceString}
        </a>
      </td>
    )
  }

  renderStatus () {
    if (this.props.product) {
      if (this.props.product.entityStatus === 'ENABLE') {
        return (
          <td className='text-center'>
            <span className='label label-success'>启用</span>
          </td>
        )
      } else if (this.props.product.entityStatus === 'DISABLE') {
        return (
          <td className='text-center'>
            <span className='label label-danger'>停用</span>
          </td>
        )
      } else {
        return null
      }
    } else {
      return null
    }
  }

  renderUpdateTime () {
    return (
      <td className='text-center'>
        {moment(this.props.product.updateDate).format('YYYY-MM-DD HH:mm:ss')}
      </td>
    )
  }

  // 商品采集
  renderGatherItem () {
    return (
      <tr>
        {this.renderConfirmModal()}
        {this.renderCheckbox()}
        {this.renderImage()}
        {this.renderProductName()}
        {this.renderPrice()}
        {this.renderOrigin()}
        {this.renderStatus()}
        {this.renderUpdateTime()}
        {this.renderGatherOperation()}
      </tr>
    )
  }

  renderGatherOperation () {
    return (
      <td className='text-center'>
        <div>
          <Button bsStyle='primary' bsSize='xsmall' onClick={this.goToEditProduct}>
            <i className='glyphicon glyphicon-edit' />编辑
          </Button>
        </div>
        <div style={{marginTop: '5px'}}>
          <Button bsStyle='danger' bsSize='xsmall' onClick={this.deleteProduct}>
            <i className='glyphicon glyphicon-trash' />删除
          </Button>
        </div>
      </td>
    )
  }

  // 商品库
  renderRepositoryItem () {
    return (
      <tr>
        {this.renderConfirmModal()}
        {this.renderCheckbox()}
        {this.renderImage()}
        {this.renderProductName()}
        {this.renderPrice()}
        {this.renderOrigin()}
        {this.renderStatus()}
        {this.renderUpdateTime()}
        {this.renderRepositoryOperation()}
      </tr>
    )
  }

  renderRepositoryOperation () {
    return (
      <td className='text-center'>
        <div>
          <Button bsStyle='primary' bsSize='xsmall' onClick={this.addToWish}>
            <i className='glyphicon glyphicon-hand-right' />认领到wish
          </Button>
        </div>

        <div style={{marginTop: '5px'}}>
          <Button bsStyle='primary' bsSize='xsmall' onClick={this.copyProduct}>
            <i className='glyphicon glyphicon-duplicate' />拷贝
          </Button>
        </div>

        <div style={{marginTop: '5px'}}>
          <Button bsStyle='primary' bsSize='xsmall' onClick={this.goToEditProduct}>
            <i className='glyphicon glyphicon-edit' />编辑
          </Button>
        </div>

        <div style={{marginTop: '5px'}}>
          <Button bsStyle='danger' bsSize='xsmall' onClick={this.deleteProduct}>
            <i className='glyphicon glyphicon-trash' />删除
          </Button>
        </div>
      </td>
    )
  }

  // 基础 listing
  renderListingItem () {
    return (
      <tr>
        {this.renderConfirmModal()}
        {this.renderCheckbox()}
        {this.renderImage()}
        {this.renderProductName()}
        {this.renderPrice()}
        {this.renderOrigin()}
        {this.renderStatus()}
        {this.renderUpdateTime()}
        {this.renderValidation()}
        {this.renderListingOperation()}
      </tr>
    )
  }

  renderListingOperation () {
    return (
      <td className='text-center'>
        {(this.props.product.regToPlatform)
          ? <div>
            <Button
              bsStyle='primary' bsSize='xsmall' onClick={this.addToWaitingToPublish}>
              <i className='glyphicon glyphicon-transfer' />转到待发布
            </Button>
          </div>
          : null
        }
        <div style={{marginTop: '5px'}}>
          <Button
            bsStyle='primary' bsSize='xsmall' onClick={this.goToEditProduct}>
            <i className='glyphicon glyphicon-edit' />编辑
          </Button>
        </div>
        <div style={{marginTop: '5px'}}>
          <Button bsStyle='danger' bsSize='xsmall' onClick={this.deleteProduct}>
            <i className='glyphicon glyphicon-trash' />删除
          </Button>
        </div>
      </td>
    )
  }

  renderValidation () {
    return (
      <td className='text-center'>
        {(this.props.product.regToPlatform)
          ? <span className='label label-success'>成功</span> : <span className='label label-danger'>失败</span>
        }
      </td>
    )
  }

  // 在线商品管理
  renderManagementItem () {
    return (
      <tr>
        {this.renderConfirmModal()}
        {this.renderCheckbox()}
        {this.renderImage()}
        {this.renderProductName()}
        {this.renderPrice()}
        {this.renderOrigin()}
        {this.renderStatus()}
        {this.renderUpdateTime()}
        {this.renderStore()}
        {this.renderManagementOperation()}
      </tr>
    )
  }

  openShopsModal () {
    this.refs['SHOPS_MODAL'].open(this.props.shops)
  }

  publishProduct (shops) {
    let shopIds = []
    shops.map(value => {
      let shop = {}
      shop.id = value.id
      shopIds.push(shop)
    })
    this.props.publishProduct(this.props.product.id, shopIds)
  }

  renderManagementOperation () {
    return (
      <td className='text-center'>
        <ShopsModal ref={'SHOPS_MODAL'} confirm={this.publishProduct} />
        <div>
          <Button bsStyle='primary' bsSize='xsmall' onClick={this.openShopsModal}>
            <i className='glyphicon glyphicon-upload' />发布
          </Button>
        </div>
        <div style={{marginTop: '5px'}}>
          <Button
            bsStyle='primary' bsSize='xsmall' onClick={this.goToEditProduct}>
            <i className='glyphicon glyphicon-edit' />编辑
          </Button>
        </div>
        <div style={{marginTop: '5px'}}>
          <Button bsStyle='danger' bsSize='xsmall' onClick={this.deleteProduct}>
            <i className='glyphicon glyphicon-trash' />删除
          </Button>
        </div>
      </td>
    )
  }

  renderStore () {
    let shops = []
    if (this.props.product && this.props.product.shops) {
      this.props.product.shops.map((value, index) => {
        shops.push(
          <div key={index} style={{marginTop: '5px'}}>
            <span className='label label-info'>{value.name}</span>
          </div>
        )
      })
    }
    return (
      <td className='text-center'>
        {shops}
      </td>
    )
  }
}

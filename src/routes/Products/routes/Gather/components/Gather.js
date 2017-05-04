import React from 'react'
import _ from 'lodash'

import {
  Button,
  Row,
  Col
} from 'react-bootstrap'

import { isTrimmedEmpty } from '~/libs/utils/StringUtil'

/**
 * Gather Product
 */
export default class Gather extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      productUrls: [], productUrl: ''
    }
    this.handleProductUrlChange = this.handleProductUrlChange.bind(this)
    this.handleProductUriKeyPress = this.handleProductUriKeyPress.bind(this)
    this.emptyProductUrl = this.emptyProductUrl.bind(this)
    this.deleteProductUrl = this.deleteProductUrl.bind(this)
    this.deleteProductUrls = this.deleteProductUrls.bind(this)
    this.gatherProducts = this.gatherProducts.bind(this)
  }

  handleProductUrlChange (event) {
    this.setState({productUrl: event.target.value})
  }

  handleProductUriKeyPress (event) {
    if (event.charCode === 13) {
      if (!(isTrimmedEmpty(this.state.productUrl))) {
        this.state.productUrls.push({url: this.state.productUrl})
        this.setState({productUrls: this.state.productUrls, productUrl: ''})
      } else {
        this.setState({productUrl: ''})
      }
    }
  }

  emptyProductUrl () {
    this.setState({productUrl: ''})
  }

  deleteProductUrl (key) {
    _.remove(this.state.productUrls, (value, index) => {
      if (index === key) {
        return true
      } else {
        return false
      }
    })
    this.setState({productUrls: this.state.productUrls})
  }

  deleteProductUrls () {
    this.setState({productUrls: []})
  }

  gatherProducts () {
    if (this.state.productUrls.length !== 0) {
      this.props.gatherProducts(this.state.productUrls)
      this.setState({productUrls: []})
    }
  }

  render () {
    return (
      <div>
        <div className='panel panel-default'>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </div>
      </div>

    )
  }

  renderHeader () {
    return (
      <div className='panel-heading'>
        采集产品
      </div>
    )
  }

  renderBody () {
    return (
      <div className='panel-body'>
        {this.renderBodyProductUrl()}
        <Col md={12}>
          <div className='input-group'>
            <input
              className='form-control' type='text' placeholder='请输入采集地址，按回车键' value={this.state.productUrl}
              onKeyPress={this.handleProductUriKeyPress} onChange={this.handleProductUrlChange} />
            <span className='input-group-btn'>
              <button className='btn btn-default' type='button' onClick={this.emptyProductUrl}>
                <i className='glyphicon glyphicon-remove' />
              </button>
            </span>
          </div>
        </Col>
      </div>
    )
  }

  renderBodyProductUrl () {
    return this.state.productUrls.map((value, key) => {
      return (
        <ProductUrl value={value} key={key} urlKey={key} deleteProductUrl={this.deleteProductUrl} />
      )
    })
  }

  renderFooter () {
    return (
      <div className='panel-footer clearfix'>
        <div className='pull-left'>
          <Button bsStyle='primary' className='btn-sm' onClick={this.gatherProducts}>
            <i className='glyphicon glyphicon-ok' />开始采集
          </Button>
        </div>

        <div className='pull-left' style={{marginLeft: '10px'}}>
          <Button bsStyle='danger' className='btn-sm' onClick={this.deleteProductUrls}>
            <i className='glyphicon glyphicon-trash' />删除所有
          </Button>
        </div>
      </div>
    )
  }
}

/**
 * Product Url
 */
class ProductUrl extends React.Component {
  constructor (props) {
    super(props)
    this.deleteProductUrl = this.deleteProductUrl.bind(this)
  }

  static propTyeps = {
    urlKey: React.PropTypes.number
  }

  deleteProductUrl () {
    this.props.deleteProductUrl(this.props.urlKey)
  }

  render () {
    return (
      <Row>
        <Col xs={12} md={11} style={{marginLeft: '14px', marginBottom: '10px'}}>
          {this.props.value.url}
        </Col>
        <Col xs={12} md={1} style={{textAlign: 'right', marginLeft: '-48px'}}>
          <a onClick={this.deleteProductUrl}>
            <i className='glyphicon glyphicon-remove' style={{color: '#ccc', cursor: 'pointer'}} />
          </a>
        </Col>
      </Row>
    )
  }
}

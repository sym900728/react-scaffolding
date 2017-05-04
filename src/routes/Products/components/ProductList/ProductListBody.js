import React from 'react'

import ProductListItem from './ProductListItem'

/**
 * Product List Body
 */
export default class ProductListBody extends React.Component {
  render () {
    return (
      <div className='panel-body' style={{padding: '0', margin: '-1px'}}>
        <table
          className='table table-bordered table-striped table-hover'
          style={{margin: '0', padding: '0', border: 'none'}}>
          {this.renderTableHeader()}
          {this.renderTableBody()}
        </table>
      </div>
    )
  }

  renderCheckbox () {
    return (
      <th className='text-center' width={'20'}>
        <input type='checkbox' checked={this.props.isSelectedAll} onChange={this.props.selectAllProducts} />
      </th>
    )
  }

  renderTableHeader () {
    let view = null
    switch (this.props.type) {
      case 'gather': // 数据采集
        view = (
          <tr>
            {this.renderCheckbox()}
            <th className='text-center' width={'98'}>主图</th>
            <th className='text-center' width={'400'}>名称</th>
            <th className='text-center'>价格</th>
            <th className='text-center'>来源</th>
            <th className='text-center'>状态</th>
            <th className='text-center' width={'100'}>更新时间</th>
            <th className='text-center' width={'100'}>操作</th>
          </tr>
        )
        break
      case 'repository': // 商品库
        view = (
          <tr>
            {this.renderCheckbox()}
            <th className='text-center' width={'98'}>主图</th>
            <th className='text-center' width={'400'}>名称</th>
            <th className='text-center'>价格</th>
            <th className='text-center'>来源</th>
            <th className='text-center'>状态</th>
            <th className='text-center' width={'100'}>更新时间</th>
            <th className='text-center' width={'120'}>操作</th>
          </tr>
        )
        break
      case 'listing': // 基础 listing
        view = (
          <tr>
            {this.renderCheckbox()}
            <th className='text-center' width={'98'}>主图</th>
            <th className='text-center' width={'400'}>名称</th>
            <th className='text-center'>价格</th>
            <th className='text-center'>来源</th>
            <th className='text-center'>状态</th>
            <th className='text-center' width={'100'}>更新时间</th>
            <th className='text-center'>验证</th>
            <th className='text-center' width={'120'}>操作</th>
          </tr>
        )
        break
      case 'management': // 在线商品管理
        view = (
          <tr>
            {this.renderCheckbox()}
            <th className='text-center' width={'98'}>主图</th>
            <th className='text-center' width={'400'}>名称</th>
            <th className='text-center'>价格</th>
            <th className='text-center'>来源</th>
            <th className='text-center'>状态</th>
            <th className='text-center' width={'100'}>更新时间</th>
            <th className='text-center'>发布店铺</th>
            <th className='text-center' width={'100'}>操作</th>
          </tr>
        )
        break
    }
    return (
      <thead>{view}</thead>
    )
  }

  renderTableBody () {
    let views = []
    this.props.products.map((value, key) => {
      views.push(
        <ProductListItem
          key={key}
          product={value}
          shops={this.props.shops}
          type={this.props.type}
          goToEditProduct={this.props.goToEditProduct}
          addToWish={this.props.addToWish}
          addToWaitingToPublish={this.props.addToWaitingToPublish}
          copyProduct={this.props.copyProduct}
          deleteProduct={this.props.deleteProduct}
          select={this.props.selectProduct}
          publishProduct={this.props.publishProduct} />
      )
    })
    return (
      <tbody>{views}</tbody>
    )
  }
}

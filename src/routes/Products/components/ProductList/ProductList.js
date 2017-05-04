import React from 'react'

import ConfirmModal from '~/components/Modal/ConfirmModal'

import ProductListHeader from './ProductListHeader'
import ProductListBody from './ProductListBody'
import ProductListFooter from './ProductListFooter'

import { prompt } from '~/components/Prompt'

/**
 * Product List
 */
export default class ProductList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '确定要批量删除吗？',
      pageIndex: 0,
      pageSize: 10,
      search: '',
      products: this.handleProducts(this.props.products),
      isSelectedAll: false
    }
    this.confirm = this.confirm.bind(this)
    this.selectProduct = this.selectProduct.bind(this)
    this.selectAllProducts = this.selectAllProducts.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.changePageSize = this.changePageSize.bind(this)
    this.searchProducts = this.searchProducts.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.deleteSelected = this.deleteSelected.bind(this)
    this.mergeSelected = this.mergeSelected.bind(this)
  }

  static propTypes = {
    type: React.PropTypes.oneOf(['gather', 'repository', 'listing', 'management']),
    categories: React.PropTypes.array
  }

  static defaultProps = {
    type: 'gather',
    categories: []
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.products !== this.props.products) {
      this.setState({products: this.handleProducts(nextProps.products), isSelectedAll: false})
    }
  }

  getQuery () {
    let categoryId = this.refs['HEADER'].getCategoryId()
    if (categoryId === '') {
      return {
        pageIndex: this.state.pageIndex, pageSize: this.state.pageSize,
        search: this.state.search
      }
    } else {
      return {
        pageIndex: this.state.pageIndex, pageSize: this.state.pageSize,
        search: this.state.search, categoryId: categoryId
      }
    }
  }

  handleProducts (products) {
    if (products) {
      products.map(value => {
        value.isSelected = false
      })
      return products
    } else {
      return []
    }
  }

  selectProduct (id) {
    this.state.products.map(value => {
      if (value.id === id) {
        (value.isSelected) ? value.isSelected = false : value.isSelected = true
      }
    })
    let temp = this.state.products.find(value => value.isSelected === false)
    let isSelectedAll = false
    if (temp) {
      isSelectedAll = false
    } else {
      isSelectedAll = true
    }
    this.setState({products: this.state.products, isSelectedAll: isSelectedAll})
  }

  selectAllProducts () {
    let product = this.state.products.find(value => value.isSelected === false)
    let isSelectedAll = false
    if (product) {
      this.state.products.map(value => {
        value.isSelected = true
      })
      isSelectedAll = true
    } else {
      this.state.products.map(value => {
        value.isSelected = false
      })
      isSelectedAll = false
    }
    this.setState({products: this.state.products, isSelectedAll: isSelectedAll})
  }

  getProducts (pageIndex, pageSize, search, categoryId) {
    if (categoryId === '') {
      this.props.getProducts({pageIndex: pageIndex, pageSize: pageSize, search: search})
    } else {
      this.props.getProducts({pageIndex: pageIndex, pageSize: pageSize, search: search, categoryId: categoryId})
    }
  }

  handlePagination (page) {
    if (this.state.pageIndex + 1 !== page) {
      let categoryId = this.refs['HEADER'].getCategoryId()
      this.getProducts(page - 1, this.state.pageSize, this.state.search, categoryId)
      this.setState({pageIndex: page - 1})
    }
  }

  changePageSize (event) {
    let categoryId = this.refs['HEADER'].getCategoryId()
    this.getProducts(0, event.target.value, this.state.search, categoryId)
    this.setState({pageIndex: 0, pageSize: event.target.value})
  }

  searchProducts (name) {
    let categoryId = this.refs['HEADER'].getCategoryId()
    this.getProducts(0, this.state.pageSize, name, categoryId)
    this.setState({pageIndex: 0, search: name})
  }

  selectCategory (id) {
    this.getProducts(0, this.state.pageSize, this.state.search, id)
    this.setState({pageIndex: 0})
  }

  confirm () {
    let ids = []
    this.state.products.map(value => {
      if (value.isSelected) {
        ids.push({id: value.id})
      }
    })
    if (ids.length === 0) {
      prompt.show('没有选中任何商品', 'warning', 1500)
    } else {
      this.props.deleteProducts(ids)
    }
  }

  deleteSelected () {
    this.refs['CONFIRM_MODAL'].open()
  }

  mergeSelected () {
    let ids = []
    this.state.products.map(value => {
      if (value.isSelected) {
        ids.push({id: value.id})
      }
    })
    if (ids.length === 0) {
      prompt.show('没有选中任何商品', 'warning', 1500)
    } else {
      this.props.mergeProducts(ids)
    }
  }

  setStateDefault () {
    this.refs['HEADER'].setStateDefault()
    this.setState({pageIndex: 0, pageSize: 10, search: ''})
  }

  setStyle () {
    if (this.props.type === 'management') {
      return {borderTopWidth: '0px'}
    } else {
      return {}
    }
  }

  render () {
    return (
      <div className='panel panel-default' style={this.setStyle()}>
        <ConfirmModal
          ref={'CONFIRM_MODAL'}
          title={this.state.title}
          confirm={this.confirm} />
        <ProductListHeader
          ref={'HEADER'}
          type={this.props.type}
          categories={this.props.categories}
          selectCategory={this.selectCategory}
          searchProducts={this.searchProducts}
          goToAddProduct={this.props.goToAddProduct} />
        <ProductListBody
          type={this.props.type}
          products={this.state.products}
          shops={this.props.shops}
          selectProduct={this.selectProduct}
          selectAllProducts={this.selectAllProducts}
          isSelectedAll={this.state.isSelectedAll}
          addToWish={this.props.addToWish}
          copyProduct={this.props.copyProduct}
          addToWaitingToPublish={this.props.addToWaitingToPublish}
          deleteProduct={this.props.deleteProduct}
          publishProduct={this.props.publishProduct}
          goToEditProduct={this.props.goToEditProduct} />
        <ProductListFooter
          type={this.props.type}
          pageIndex={this.state.pageIndex}
          pageSize={this.state.pageSize}
          total={this.props.total}
          handlePagination={this.handlePagination}
          changePageSize={this.changePageSize}
          enableSelected={this.props.enableSelected}
          disableSelected={this.props.disableSelected}
          deleteSelected={this.deleteSelected}
          mergeSelected={this.mergeSelected} />
      </div>
    )
  }
}

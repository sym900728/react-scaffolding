import React from 'react'

import {
  Button,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'

import classnames from 'classnames'

import { isTrimmedEmpty } from '~/libs/utils/StringUtil'

import styles from './ProductList.scss'

const filterTitle = ['过滤：所有', '过滤：停用', '过滤：启用']
const sortTitle = ['排序：默认', '排序：名称']

/**
 * Product List Header
 */
export default class ProductListHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterTitle: '过滤：所有',
      sortTitle: '排序：默认',
      name: '',
      categoryId: '-1'
    }
    this.handleFilter = this.handleFilter.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this)
    this.searchProducts = this.searchProducts.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  getCategoryId () {
    if (this.state.categoryId === '-1') {
      return ''
    } else {
      return this.state.categoryId
    }
  }

  setStateDefault () {
    this.setState({name: '', categoryId: '-1'})
  }

  handleFilter (eventKey) {
    this.setState({filterTitle: filterTitle[eventKey]})
  }

  handleSort (eventKey) {
    this.setState({sortTitle: sortTitle[eventKey]})
  }

  handleSearch (event) {
    this.setState({name: event.target.value})
  }

  handleSearchKeyPress (event) {
    if (event.charCode === 13) {
      if (!isTrimmedEmpty(this.state.name)) {
        this.props.searchProducts(this.state.name)
      } else {
        this.props.searchProducts('')
        this.setState({name: ''})
      }
    }
  }

  searchProducts () {
    if (!isTrimmedEmpty(this.state.name)) {
      this.props.searchProducts(this.state.name)
    } else {
      this.props.searchProducts('')
      this.setState({name: ''})
    }
  }

  handleSelectChange (event) {
    if (event.target.value === '-1') {
      this.props.selectCategory('')
    } else {
      this.props.selectCategory(event.target.value)
    }
    this.setState({categoryId: event.target.value})
  }

  render () {
    return (
      <div className='panel-heading clearfix'>
        <div className='pull-left'>
          <input
            className='form-control input-control input-sm' type='text' placeholder='输入名称或ParentSKU...'
            value={this.state.name} onChange={this.handleSearch} onKeyPress={this.handleSearchKeyPress} />
        </div>

        <div className='pull-left' style={{marginLeft: '10px'}}>
          <Button bsStyle='primary' className='btn-sm' onClick={this.searchProducts}>
            <i className='glyphicon glyphicon-search' />搜索
          </Button>
        </div>
        {this.renderLeftCategories()}
        {this.renderLeftAddButton()}
      </div>
    )
  }

  renderLeftAddButton () {
    let view = null

    switch (this.props.type) {
      case 'gather':
        break
      case 'repository':
        view = (
          <div className='pull-left' style={{marginLeft: '10px'}}>
            <Button bsStyle='primary' className='btn-sm' onClick={this.props.goToAddProduct}>
              <i className='glyphicon  glyphicon-plus' />添加商品
            </Button>
          </div>
        )
        break
      case 'listing':
        break
    }
    return view
  }

  initProductCategories () {
    let view = []
    view.push(<option key={'-1'} value='-1'>全部分类</option>)
    this.props.categories.map((value1, index1) => {
      if (value1.subCatalogs) {
        value1.subCatalogs.map((value2, index2) => {
          if (value2.subCatalogs) {
            let subView = []
            value2.subCatalogs.map((value3, index3) => {
              subView.push(<option key={index3} value={value3.id}>{value3.name}</option>)
            })
            view.push(
              <optgroup key={index1 + '-' + index2} label={value1.name + ' - ' + value2.name}>{subView}</optgroup>
            )
          }
        })
      }
    })
    return view
  }

  renderLeftCategories () {
    let view = null
    switch (this.props.type) {
      case 'gather':
        break
      case 'repository':
      case 'listing':
        view = (
          <div className='pull-left'>
            <select
              className={classnames('form-control', styles['header-select'])}
              value={this.state.categoryId}
              onChange={this.handleSelectChange}>
              {this.initProductCategories()}
            </select>
          </div>
        )
        break
    }
    return view
  }

  renderRight () {
    return (
      <div className='pull-right'>
        <DropdownButton id={1} title={this.state.filterTitle} className='btn-sm' style={{marginRight: '10px'}}>
          <MenuItem eventKey='0' onSelect={this.handleFilter} active>过滤：所有</MenuItem>
          <MenuItem eventKey='1' onSelect={this.handleFilter}>过滤：停用</MenuItem>
          <MenuItem eventKey='2' onSelect={this.handleFilter}>过滤：启用</MenuItem>
        </DropdownButton>

        <DropdownButton id={2} title={this.state.sortTitle} className='btn-sm'>
          <MenuItem eventKey='0' onSelect={this.handleSort} active>排序：默认</MenuItem>
          <MenuItem eventKey='1' onSelect={this.handleSort}>排序：名称</MenuItem>
        </DropdownButton>
      </div>
    )
  }
}

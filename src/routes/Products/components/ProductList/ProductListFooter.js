import React from 'react'

import {
  Button,
  Pagination
} from 'react-bootstrap'

import classnames from 'classnames'
import styles from './ProductList.scss'

/**
 * Product List Footer
 */
export default class ProductListFooter extends React.Component {
  render () {
    return (
      <div className='panel-footer clearfix'>
        <div className='pull-left'>选中项:
          {/*{this.renderMergeButton()}*/}
          {/*{this.renderEnableButton()}*/}
          {/*{this.renderDisableButton()}*/}
          {this.renderDeleteButton()}
        </div>
        <div className='pull-right'>
          {this.renderRecords()}
          {this.renderPagination()}
          <div className='pull-right' style={{marginLeft: '5px', marginRight: '5px'}}>
            {this.renderPageSize()}
          </div>
        </div>
      </div>
    )
  }

  renderMergeButton () {
    let view = null
    switch (this.props.type) {
      case 'gather':
        view = (
          <Button
            bsStyle='warning' className='btn-sm' style={{marginLeft: '10px'}}
            onClick={this.props.mergeSelected}>
            合并商品
          </Button>
        )
        break
      case 'repository':
        view = (
          <Button
            bsStyle='warning' className='btn-sm' style={{marginLeft: '10px'}}
            onClick={this.props.mergeSelected}>
            合并商品
          </Button>
        )
        break
      case 'listing':
        break
      case 'management':
        break
    }
    return view
  }

  renderEnableButton () {
    return (
      <Button bsStyle='primary' className='btn-sm' style={{marginLeft: '10px'}} onClick={this.props.enableSelected}>
        <i className='glyphicon glyphicon-ok' />启用
      </Button>
    )
  }

  renderDisableButton () {
    return (
      <Button bsStyle='info' className='btn-sm' style={{marginLeft: '10px'}} onClick={this.props.disableSelected}>
        <i className='glyphicon glyphicon-remove' />停用
      </Button>
    )
  }

  renderDeleteButton () {
    return (
      <Button bsStyle='danger' className='btn-sm' style={{marginLeft: '10px'}} onClick={this.props.deleteSelected}>
        <i className='glyphicon glyphicon-trash' />删除
      </Button>
    )
  }

  renderRecords () {
    return (
      <div className='pagination_total'>共{this.props.total}条记录&nbsp;&nbsp;</div>
    )
  }

  renderPagination () {
    let items = Math.ceil(this.props.total / this.props.pageSize)
    return (
      <Pagination
        className={classnames('pagination-sm', styles['pagination'])}
        prev next first last
        ellipsis
        boundaryLinks
        items={items}
        maxButtons={5}
        activePage={this.props.pageIndex + 1}
        onSelect={this.props.handlePagination} />
    )
  }

  renderPageSize () {
    return (
      <select
        className='form-control custom-select btn-sm'
        value={this.props.pageSize} onChange={this.props.changePageSize}>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='30'>30</option>
        <option value='40'>40</option>
        <option value='50'>50</option>
        <option value='60'>60</option>
        <option value='70'>70</option>
        <option value='80'>80</option>
        <option value='90'>90</option>
        <option value='100'>100</option>
      </select>
    )
  }
}

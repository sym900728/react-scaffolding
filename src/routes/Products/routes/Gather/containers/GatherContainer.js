import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Gather from '../components/Gather'
import ProductList from '../../../components/ProductList/ProductList'
import Breadcrumb from '../components/Breadcrumb'
import LoadingModal from '~/components/Loading/LoadingModal'

import { actions as gatherActions } from '../modules/GatherModule'

const actions = {...gatherActions}

/**
 * Product Gather Container
 */
class GatherContainer extends React.Component {
  constructor (props) {
    super(props)
    this.gatherProducts = this.gatherProducts.bind(this)
    this.goToEditProduct = this.goToEditProduct.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.mergeProducts = this.mergeProducts.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.deleteProducts = this.deleteProducts.bind(this)
  }

  injectQuery (args) {
    args.type = 'CRAWL'
    args.orderByField = '-updateDate'
    return args
  }

  componentDidMount () {
    // let args = this.refs['PRODUCT_LIST'].getQuery()
    // this.props.actions.getProducts(this.injectQuery(args))
  }

  componentWillUnmount () {
    this.props.actions.emptyCache()
  }

  goToEditProduct (id) {
    this.props.router.push('/products/gather/' + id + '/edit')
  }

  gatherProducts (productUrls) {
    // let args = this.refs['PRODUCT_LIST'].getQuery()
    // args.pageIndex = 0
    // args.pageSize = 10
    // args.search = ''
    // let context = this.refs['PRODUCT_LIST']
    // this.props.actions.gatherProducts(productUrls, this.injectQuery(args), context)
  }

  getProducts (args) {
    this.props.actions.getProducts(this.injectQuery(args))
  }

  mergeProducts (ids) {
    let args = this.refs['PRODUCT_LIST'].getQuery()
    this.props.actions.mergeProducts(ids, this.injectQuery(args))
  }

  deleteProduct (id) {
    let args = this.refs['PRODUCT_LIST'].getQuery()
    this.props.actions.deleteProduct(id, this.injectQuery(args))
  }

  deleteProducts (ids) {
    let args = this.refs['PRODUCT_LIST'].getQuery()
    this.props.actions.deleteProducts(ids, this.injectQuery(args))
  }

  render () {
    let { products, total, isFetching, isGathering } = this.props.products.gather.data
    return (
      <div className='container theme-showcase'>
        <LoadingModal show={isFetching || isGathering} />
        <Breadcrumb router={this.props.router} />
        <Gather gatherProducts={this.gatherProducts} />
        <ProductList
          ref={'PRODUCT_LIST'}
          type={'gather'}
          products={products}
          total={total}
          getProducts={this.getProducts}
          mergeProducts={this.mergeProducts}
          deleteProduct={this.deleteProduct}
          deleteProducts={this.deleteProducts}
          goToEditProduct={this.goToEditProduct} />
        <hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(GatherContainer)

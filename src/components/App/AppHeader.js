import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import styles from '../../assets/styles/app.scss'

/**
 * App Header
 */
export default class AppHeader extends React.Component {
  constructor (props) {
    super(props)
    this.goToAdminHome = this.goToAdminHome.bind(this)
    this.goToProductGather = this.goToProductGather.bind(this)
    this.goToProductRepository = this.goToProductRepository.bind(this)
    this.goToProductListing = this.goToProductListing.bind(this)
    this.goToProductManagement = this.goToProductManagement.bind(this)
    this.goToShopAuthorization = this.goToShopAuthorization.bind(this)
    this.goToProductType = this.goToProductType.bind(this)
    this.goToProductCatalogs = this.goToProductCatalogs.bind(this)
    this.goToProductBrand = this.goToProductBrand.bind(this)
    this.goToWarehouseType = this.goToWarehouseType.bind(this)
    this.goToSize = this.goToSize.bind(this)
    this.goToSKUSizes = this.goToSKUSizes.bind(this)
    this.exitSystem = this.exitSystem.bind(this)
    this.goToWishManage = this.goToWishManage.bind(this)
    this.goToProductUpdateLkn = this.goToProductUpdateLkn.bind(this)
    this.goToSystemsAdmins = this.goToSystemsAdmins.bind(this)
    this.goToRoles = this.goToRoles.bind(this)
    this.goToRight = this.goToRight.bind(this)
    this.goToRedeploy = this.goToRedeploy.bind(this)
    this.goToLog = this.goToLog.bind(this)
    this.goToTaskLogs = this.goToTaskLogs.bind(this)
  }

  static propTypes = {
    router: React.PropTypes.object
  }

  goToAdminHome () {
    this.props.router.push('/')
  }

  goToProductGather () {
    this.props.history.push('/products/gather')
  }

  goToProductRepository () {
    this.props.history.push('/auth')
  }

  goToProductListing () {
    this.props.history.push('/products')
  }

  goToProductManagement () {
    this.props.router.push('/products/management')
  }

  goToShopAuthorization () {
    this.props.router.push('/shops/authorization')
  }

  goToProductType () {
    this.props.router.push('/configs/products/types')
  }

  goToProductCatalogs () {
    this.props.router.push('/configs/products/catalogs')
  }

  goToProductBrand () {
    this.props.router.push('/configs/products/brands')
  }

  goToProductUpdateLkn () {
    this.props.router.push('/configs/products/updateLkn')
  }

  goToSize () {
    this.props.router.push('/configs/color-templates')
  }

  goToSKUSizes () {
    this.props.router.push('/configs/size-templates')
  }

  goToWarehouseType () {
    this.props.router.push('/configs/warehouses/category')
  }

  goToSystemsAdmins () {
    this.props.router.push('/systems/admins')
  }

  goToRoles () {
    this.props.router.push('/systems/admins/roles')
  }
  goToRight () {
    this.props.router.push('/systems/admins/permissions')
  }

  goToRedeploy () {
    this.props.router.push('/systems/admins/redeploy')
  }

  goToLog () {
    this.props.router.push('/systems/admins/operation-logs')
  }
  goToTaskLogs () {
    this.props.router.push('/systems/admins/task-logs')
  }
  exitSystem () {
    this.props.logout()
  }

  goToWishManage () {
    this.props.router.push('/configs/products/wish')
  }
  active () {
    // let route = this.props.router.location.pathname
    let isGatherActive = false
    let isRepositoryActive = false
    let isListingActive = false
    let isManagementActive = false
    let isShopAuthActive = false
    let isConfigsActive = false
    let isSystemActive = false

    // if (route.indexOf('/products/gather') >= 0) {
    //   isGatherActive = true
    // } else {
    //   isGatherActive = false
    // }
    //
    // if (route.indexOf('/products/repository') >= 0) {
    //   isRepositoryActive = true
    // } else {
    //   isRepositoryActive = false
    // }
    //
    // if (route.indexOf('/products/listing') >= 0) {
    //   isListingActive = true
    // } else {
    //   isListingActive = false
    // }
    //
    // if (route.indexOf('/products/management') >= 0) {
    //   isManagementActive = true
    // } else {
    //   isManagementActive = false
    // }
    //
    // if (route.indexOf('/shops/authorization') >= 0) {
    //   isShopAuthActive = true
    // } else {
    //   isShopAuthActive = false
    // }
    //
    // if (route.indexOf('/configs/') >= 0) {
    //   isConfigsActive = true
    // } else {
    //   isConfigsActive = false
    // }
    // if (route.indexOf('/systems/') >= 0) {
    //   isSystemActive = true
    // } else {
    //   isSystemActive = false
    // }
    return {
      isGatherActive, isRepositoryActive, isListingActive,
      isManagementActive, isShopAuthActive, isConfigsActive,
      isSystemActive
    }
  }

  render () {
    let {
      isGatherActive, isRepositoryActive, isListingActive,
      isManagementActive, isShopAuthActive, isConfigsActive,
      isSystemActive
    } = this.active()
    return (
      <Navbar inverse collapseOnSelect fixedTop>
        {this.renderNavBarHeader()}
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1} className={styles.headernav} onClick={this.goToProductGather} active={isGatherActive}>
              数据采集
            </NavItem>
            <NavItem
              eventKey={2} className={styles.headernav} onClick={this.goToProductRepository}
              active={isRepositoryActive}>
              商品库
            </NavItem>
            {this.renderProductListing(isListingActive)}
            {this.renderProductManagement(isManagementActive)}
            {this.renderShopsAuth(isShopAuthActive)}
            {/*{this.renderImagesManagement()}*/}
            {this.renderConfigs(isConfigsActive)}
            {this.renderSystem(isSystemActive)}
          </Nav>
          <Nav pullRight className={styles.headernav}>
            <NavItem eventKey={1} href='#'>管理员</NavItem>
            <NavItem eventKey={2} onClick={this.exitSystem}>退出系统</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  renderNavBarHeader () {
    return (
      <Navbar.Header>
        <Navbar.Brand>
          <a onClick={this.goToAdminHome}>后台</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    )
  }

  renderProductListing (isListingActive) {
    return (
      <NavDropdown id={3} eventKey={3} title='基础Listing' className={styles.nav} active={isListingActive}>
        <MenuItem eventKey={3.1} className={styles.navTwo} onClick={this.goToProductListing}>
          Wish 平台
        </MenuItem>
      </NavDropdown>
    )
  }

  renderProductManagement (isManagementActive) {
    return (
      <NavDropdown id={4} eventKey={4} title='在线商品管理' className={styles.nav} active={isManagementActive}>
        <MenuItem eventKey={4.1} className={styles.navTwo} onClick={this.goToProductManagement}>
          Wish 平台
        </MenuItem>
      </NavDropdown>
    )
  }

  renderShopsAuth (isShopAuthActive) {
    return (
      <NavDropdown id={5} eventKey={5} title='店铺授权' className={styles.nav} active={isShopAuthActive}>
        <MenuItem eventKey={5.1} className={styles.navTwo} onClick={this.goToShopAuthorization}>
          Wish 平台
        </MenuItem>
      </NavDropdown>
    )
  }

  renderImagesManagement () {
    return (
      <NavItem eventKey={6} className={styles.headernav} onClick={this.goToAdminHome}>图片管理</NavItem>
    )
  }

  renderConfigs (isConfigsActive) {
    return (
      <NavDropdown id={7} eventKey={7} title='配置' className={styles.nav} active={isConfigsActive}>
        <MenuItem eventKey={7.1} className={styles.navTwo} onClick={this.goToProductCatalogs}>商品类目</MenuItem>
        <MenuItem eventKey={7.2} className={styles.navTwo} onClick={this.goToProductType}>商品类型</MenuItem>
        <MenuItem eventKey={7.3} className={styles.navTwo} onClick={this.goToSize}>SKU颜色模板</MenuItem>
        <MenuItem eventKey={7.4} className={styles.navTwo} onClick={this.goToSKUSizes}>SKU尺寸模板</MenuItem>
        {/*<MenuItem eventKey={7.5} className={styles.navTwo} onClick={this.goToWishManage}>WISH商品颜色管理</MenuItem>*/}
        <MenuItem eventKey={7.6} className={styles.navTwo} onClick={this.goToProductBrand}>品牌管理</MenuItem>
        <MenuItem eventKey={7.7} className={styles.navTwo} onClick={this.goToWarehouseType}>仓库类型</MenuItem>
        {/*<MenuItem eventKey={7.8} className={styles.navTwo} onClick={this.goToProductUpdateLkn}>同步数据</MenuItem>*/}
      </NavDropdown>
    )
  }

  renderSystem (isSystemActive) {
    return (
      <NavDropdown id={8} eventKey={8} title='系统' className={styles.nav} active={isSystemActive}>
        <MenuItem eventKey={8.1} className={styles.navTwo} onClick={this.goToSystemsAdmins}>管理员</MenuItem>
        <MenuItem eventKey={8.2} className={styles.navTwo} onClick={this.goToRoles}>角色列表</MenuItem>
        <MenuItem eventKey={8.3} className={styles.navTwo} onClick={this.goToRight}>权限列表</MenuItem>
        {/*<MenuItem eventKey={8.4} className={styles.navTwo} onClick={this.goToRedeploy}>重新部署</MenuItem>*/}
        <MenuItem eventKey={8.5} className={styles.navTwo} onClick={this.goToLog}>操作日志</MenuItem>
        <MenuItem eventKey={8.6} className={styles.navTwo} onClick={this.goToTaskLogs}>任务日志</MenuItem>
      </NavDropdown>
    )
  }
}

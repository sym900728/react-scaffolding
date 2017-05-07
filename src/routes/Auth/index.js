import AuthContainers from './containers/AuthContainers'

export default (store) => {
  return {
    path: '/auth',
    component: AuthContainers
  }
}

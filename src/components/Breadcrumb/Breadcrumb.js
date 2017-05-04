/**
 * Created by wanye on 2017/4/17.
 */
import React from 'react'
import {Breadcrumb as BootstrapBreadcrumb} from 'react-bootstrap'

const Breadcrumb = ({data}) => {
  return (
    <BootstrapBreadcrumb>
      {data.map((item, index) => {
        if (index === data.length - 1) {
          return (
            <BootstrapBreadcrumb.Item active key={index}>
              {item.name}
            </BootstrapBreadcrumb.Item >
          )
        } else {
          return (
            <BootstrapBreadcrumb.Item onClick={item.onClick} key={index}>
              {item.name}
            </BootstrapBreadcrumb.Item >
          )
        }
      })}
    </BootstrapBreadcrumb>
  )
}
export default Breadcrumb

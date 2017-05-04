/**
 * Created by wanye on 2017/4/24.
 */
export const compareSelect = (parent, children) => {
  if (parent && children) {
    let count = 0
    let isSelectedAll = false
    let newData = parent.map((value) => {
      if (children.length === 0) {
        value.isSelected = false
      } else {
        for (let i = 0, len = children.length; i < len; i++) {
          if (children[i].id === value.id) {
            count += 1
            value.isSelected = true
            break
          } else {
            value.isSelected = false
          }
        }
      }
      return value
    })
    if ((count === parent.length) && (count !== 0)) {
      isSelectedAll = true
    }
    return {data: newData, isSelectedAll: isSelectedAll}
  }
}

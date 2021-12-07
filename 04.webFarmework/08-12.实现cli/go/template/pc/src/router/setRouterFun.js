
/**
 * @description 设置路由
 * @param path  路径
 * @param exact 是否严格匹配 
 * @param Comp 组件 
 * @param breadcrumb 路由的面包屑显示
 * @returns 路由对象
 */
export function setRouter(description, { path, exact = true, Comp, breadcrumb }) {
  return {
    path: path,
    exact: exact,
    component: (props) => {
      window.scrollTo(0, 0)
      return <Comp {...props} breadcrumb={breadcrumb} />
    }
  }
}

/**
 * @description 设置嵌套路由
 * @param path  路径
 * @param exact 是否严格匹配 
 * @param Comp 组件 
 * @param children :Array<{path,Comp}> 包含路径和组件的数组
 * @param breadcrumb 路由的面包屑显示
 * @returns 路由对象
 */
export function setDeepRouter(description, { path, exact = true, Comp, children, breadcrumb }) {
  return {
    path: path,
    exact: exact,
    component: (props) => {
      window.scrollTo(0, 0)
      return <Comp {...props} breadcrumb={breadcrumb} />
    },
    routes: children.map(item => ({
      path: item.path,
      exact: item.exact,
      component: (props) => {
        window.scrollTo(0, 0)
        return <item.Comp {...props} />
      }
    }))
  }
}

// TODO 统一建立路由守卫
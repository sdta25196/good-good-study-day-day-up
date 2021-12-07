import { Route } from "react-router-dom"
import routes from "./routes"
// 路由解析组件
function RouteWithSubRoutes(route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export { routes, RouteWithSubRoutes }

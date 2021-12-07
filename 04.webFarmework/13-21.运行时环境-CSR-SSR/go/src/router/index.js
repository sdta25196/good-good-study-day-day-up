import React, { lazy } from 'react';
import { Route } from "react-router-dom";
const App = lazy(() => import('../App'));
const Ssr = lazy(() => import('../SSR'));

// 路由配置，路由名全部小写
const routes = [
  {
    path: "/",
    exact: true,
    component: (props) => <App {...props} />
  },
  {
    path: "/Ssr",
    exact: true,
    component: (props) => <Ssr {...props} />
  },
];

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
  );
}

export { routes, RouteWithSubRoutes };

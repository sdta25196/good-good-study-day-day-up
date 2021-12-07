import { lazy } from 'react'
import { setRouter, setDeepRouter } from './setRouterFun'

//! 路由配置，路由名全部小写
//! breadcrumb处理动态路由情况下的匹配，由功能组件自行补充即可
const routes = [
  setRouter("首页", { path: "/", exact: true, Comp: lazy(() => import('../pages/home')) }),
  setRouter("中职院校", {
    path: "/school", exact: true, Comp: lazy(() => import('../pages/school')),
  }),
  setDeepRouter("中职院校落地页", {
    path: "/school/:schoolCode", exact: false, Comp: lazy(() => import('../pages/school/SchoolPage')),
    breadcrumb: [{ name: "中职院校", path: "/school" }],
    children: [
      {
        path: "/school/:schoolCode/", exact: true, Comp: lazy(() => import('../pages/school/SchoolPageIntro')),
      },
      {
        path: "/school/:schoolCode/intro/detail", exact: true, Comp: lazy(() => import('../pages/school/SchoolPageIntroDetail')),
      },
      {
        path: "/school/:schoolCode/special", exact: true, Comp: lazy(() => import('../pages/school/SchoolPageSpecial')),
      },
      {
        path: "/school/:schoolCode/special/:specialId/detail", exact: true, Comp: lazy(() => import('../pages/school/SchoolPageSpecialDetail')),
      },
      {
        path: "/school/:schoolCode/future", exact: true, Comp: lazy(() => import('../pages/school/SchoolPageFuture')),
      },
      {
        path: "/school/:schoolCode/news", exact: true, Comp: lazy(() => import('../pages/school/SchoolPageNews')),
      },
    ]
  }),
  setRouter("职教专业", {
    path: "/special", exact: true, Comp: lazy(() => import('../pages/special')),
  }),
  setDeepRouter("职教专业落地页", {
    path: "/special/:specialId", exact: false, Comp: lazy(() => import('../pages/special/SpecialPage')),
    breadcrumb: [{ name: "职教专业", path: "/special" }],
    children: [
      {
        path: "/special/:specialId", exact: true, Comp: lazy(() => import('../pages/special/SpecialPageIntro')),
      },
      {
        path: "/special/:specialId/school", exact: true, Comp: lazy(() => import('../pages/special/SpecialPageSchool')),
      },
    ]
  }),
  setRouter("职教热点", {
    path: "/news", exact: true, Comp: lazy(() => import('../pages/news')),
  }),
  setRouter("职教热点列表页", {
    path: "/news/list/:classId", exact: true, Comp: lazy(() => import('../pages/news/NewsList')),
    breadcrumb: [{ name: "职教热点", path: "/news" }]
  }),
  setRouter("职教热点详情", {
    path: "/news/detail/:newsId", exact: true, Comp: lazy(() => import('../pages/news/NewsDetail')),
    breadcrumb: [{ name: "职教热点", path: "/news" }, { name: "资讯详情" }]
  }),
  setRouter("选择地区", {
    path: "/location", exact: true, Comp: lazy(() => import('../pages/location')),
    breadcrumb: [{ name: "首页", path: "/" }, { name: "地区切换", path: "/location" }]
  }),
  setRouter("首页搜索", {
    path: "/search/:type/:value", exact: true, Comp: lazy(() => import('../pages/search')),
    breadcrumb: [{ name: "首页", path: "/" }, { name: "搜索", path: "/search" }]
  }),
  setRouter("测试demo", { path: "/example", exact: true, Comp: lazy(() => import('../pages/example')) }),
  setRouter("全局匹配404", { path: "*", exact: true, Comp: lazy(() => import('../pages/_404')) }),
]

export default routes
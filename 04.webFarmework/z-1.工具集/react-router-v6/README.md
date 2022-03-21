## react-router-v6

`yarn add react-router-dom@6`

## 取消了withRouter

`react-router`v6中，已经不需要`withRouter`了。一切都可以使用`react-router`提供的`hooks`来完成

## 使用`element`进行渲染

取消了`component` \ `render`的使用，又`element` 作为渲染参数使用: `<Route path="/" component={Profile} />`

原本的`component` \ `render`是由于react未能提供给渲染组件时传递props的方式，所以react-router使用了`passProps`和高阶组件的方式来获取路由数据和自定义 props。

现在由于`hooks`的出现，react-router有了新的方式(自定义了很多hook)去处理`props`, 所以就可以直接使用`element`渲染了

## 取消了<Switch>

使用`<Routes>`代替了`<Switch>`,`Routes` 主要带来的改变是：
1. 路由是根据最佳匹配选择的，而不是按顺序遍历。
2. 更方便的嵌套路由

## v6的路由匹配机制和二级路由

V6的匹配机制不再是按照顺序匹配，而是优先匹配更符合的选择。例如：

下面这个例子，可以正确的匹配到`/users/me`=>`<OwnUserProfile/>` 和 `/users/id`=>`<UserProfile/>`,这在V6之前是做不到的。
```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>
      <Routes>
        <Route path=":id" element={<UserProfile />} />
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}
```
## v6如何添加404路由

与以往一样，只需要添加一个path为`*`的路由即可，只不过这次它不需要写在最后面了`<Route path="*" element={<NoMatch />} />`

## V6不再支持正则路由

删除正则路由的原因：

1. 减小React Router的体积
2. 由于匹配机制的修改，正则造成误差和bug

## Route

* v6 中的所有路径匹配都会忽略 URL 上的尾部斜杠, 所以我们可以忽略不写`path`尾部的斜杠 ` <Route path="me" element={<App />} />`
* `Route`加上`caseSensitive`参数，可以表示区分大小写，不过建议全部小写。` <Route path="me" element={<App />} caseSensitive/>`

## link

`link to`跳转将固定拼接到当前url,例如：当前URL是`/paths`,点击`<link to='me'/>`，页面将跳转到`/paths/me`

同时, `link`标签支持使用`..`，来跳转到上级路径。

## useRoutes - 路由配置

使用`useRoutes`代替`react-router-config`, 

```js
function App() {
  let routes = [
    {
      path: "*",
      element: <NoMatch />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "about/*",
      element: <About />,
      children: [
        {
          path: ":id",
          element: <AboutChildren1 />,
        },
        { path: "me", element: <AboutChildren2 /> },
      ],
    },
  ];
  let element = useRoutes(routes)

  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      {element}
    </div>
  );
}
```

效果等同于如下：

```js
function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/*" element={<NoMatch />} />
        <Route path="/" element={<Home />} />
        <Route path="about/*" element={<About />} >
          <Route path=":id" element={<AboutChildren1 />} />
          <Route path="me" element={<AboutChildren2 />} />
        </Route>
      </Routes>
    </div>
  );
}
```
## useNavigate - 导航

使用`useNavigate`代替`useHistory`

```js
// This is a React Router v6 app
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```
需要替换当前位置而不是将新位置推送到历史堆栈，请使用`navigate(to, { replace: true })`

需要状态，请使用`navigate(to, { state })`

**或者使用Navigate**

```js
import { Navigate } from "react-router-dom";

function App() {
  return <Navigate to="/home" replace state={state} />;
}
```

如果需要goBack可以使用 `navigate(-1)`

## useMatch

替换`useRouteMatch`为`useMatch`

`useMatch`与 v5的`useRouteMatch`非常相似，但有一些关键区别：
* 它使用我们新的路径模式匹配算法
* 现在需要模式参数
* 不再接受一系列模式
* 将模式作为对象传递时，一些选项已重命名以更好地与 v6 中的其他 API 保持一致
* `useRouteMatch({ strict })`就是现在的`useMatch({ end })`
* `useRouteMatch({ sensitive })`就是现在的`useMatch({ caseSensitive })`
* 它返回具有不同形状的匹配对象

## Outlet

可以使用`<Outlet/>`组件来渲染子路由。如果路由匹配，就会渲染，如果不匹配就不渲染
```js
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      // 如果路由匹配 /messages 或者 /tasks 就会渲染对应的组件，否则不渲染
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          path="messages"
          element={<DashboardMessages />}
        />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}
```


> 就个人体验上来说，V6的确比V5更好用了。


## 更多

* [老项目升级到V6](https://reactrouterdotcom.fly.dev/docs/en/v6/upgrading/v5)
* [react-router官方文档](https://reactrouterdotcom.fly.dev/docs/en/v6)
# 职教网-PC端

### 安装
  `yarn`

### 启动
  `yarn start` 默认启动**测试线**接口，
  `yarn start:release` 启动**正式线**接口

### 打包
  `yarn build` 默认打包**正式线**接口
  `yarn build:dev` 打包**测试线**接口

### 设计图1200px

### 样式
  * 重置样式 `public/assets/css/normalize.css`
  * 全局样式 `src/1-assets/scss/common.scss`
  * 局部样式 每个组件的对应 `[name].moudle.scss`

### 代码结构
  * 路由页面 `src/pages/[page]`
  * 路由页面 `src/pages/[page]`
  * 组件页面 `src/components/[page]`
    * 组件统一由 `src/components/[page]/index.js` 导出
  * 网络请求 `src/axios`
  * 自定义hooks `src/hooks`
  * redux、router、utils

### 环境变量`process.env[.parame]`
  src同级目录下创建 *.env* 内容可编辑，自定义环境变量需要*REACT_APP_*开头
```javascript
  // 端口号
  PORT = 3000
```

### redux使用
 * redux/actions/actionCreators 新建处理函数，actionTypes中 编写type
  ```javascript
      <!-- 使用thunk写法-->
      let nextTodoId = 0
      export const addTodo = text => {
        return async function (dispatch, getState) {
          let res = await fetchSecretSauce() //调用某个异步函数
          return dispatch({ //处理dispatch
            type: ADD_TODO,
            id: nextTodoId++,
            text
          })
        }
      }
      <!-- 不使用thunk写法 -->
      export const setVisibilityFilter = (filter) => {
        return {  //不使用thunk, 直接return action即可
          type: SET_VISIBILITY_FILTER,
          filter
        }
      }

  ```
 * reducers 下 新建对应的功能reducer文件夹，或者再某文件中添加对应的case, type与actionType对应

### 接口添加
  * `src/axios/eolApi.js` 中添加
    ```javascript
      export const videoDetail = 'videoDetail' // 页面调用的path

      setRealUrl(`E答链接关系映射表`, // 描述
        eAnswerUrl, (params) => eAnswer + `/app/html/www/questionurl/zsgk_id_app_url.json` //path与url
      )
    ```
  * 任意组件中使用 
    ```javascript
      import EolAxios, { videoDetail } from "../../axios"
      function getData() {
        <!-- 静态接口请求 -->
        EolAxios.staticRequest({
          path: videoDetail,
          params:[]
        }).then(e => {
          if (!e) return
          console.log(e)
        })
        <!-- 动态接口请求 -->
        EolAxios.dynamicRequest({
          path: videoDetail,
          formData: {
            page: 15,
            province_id: 34,
            size: 20
          }
        }).then(e => {
          if (!e) return
          console.log(e)
        })
      }
    ```

# 项目概览
### 路由 "react-router-dom": "^5.2.0",
### 路由懒加载
### 兼容IE9
### UI框架（兼容IE9） "antd": "3.26.19",
### 接口代理 "http-proxy-middleware": "^1.2.0",
### 数据管理及中间件 "redux": "^4.0.5", "react-redux": "^7.2.3", "redux-thunk": "^2.3.0",
### 因为antd3不支持react的严格模式，所以开发期间使用到antd3的组件，控制台会报错
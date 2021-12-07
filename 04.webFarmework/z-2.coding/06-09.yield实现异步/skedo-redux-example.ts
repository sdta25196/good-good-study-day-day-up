
import { Action } from 'redux'
import { combineReducers, skedoReduxMiddleWare } from './skedo-redux'
import createStore from './createStore'
import applyMiddleware from './applyMiddleware'

/** 
 * 
 * skedo-redux测试
 */
type Async<T> = Promise<T> | Generator<T> | (() => Promise<T>) | (() => Generator<T>) | T

type UserAction = {
} & Action<any>

type UserState = {
  logined: string | (() => Async<string>)
}

function isUserLoggedIn() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve("user is loggedin")
    }, 1000)
  })

}

function reducer(state: UserState = { logined: "not login" }, action: UserAction) {
  switch (action.type) {
    case "CHECK_LOGIN_STATUS":
      return {
        ...state,
        logined: isUserLoggedIn
      }
  }
  return state
}

//! 1 - 使用自己的combineReducers，在reducer中添加了异步的state逻辑
const reducers = combineReducers({
  user: reducer
})



// 创建store,使用自定义的中间件
const userStore = createStore(reducers, applyMiddleware(skedoReduxMiddleWare))



userStore.subscribe(() => {
  console.log('state changed', userStore.getState())
})


//! 2 - 派发action，触发自定义的中间件, 由中间件又触发了reducer
userStore.dispatch({
  type: 'CHECK_LOGIN_STATUS'
})
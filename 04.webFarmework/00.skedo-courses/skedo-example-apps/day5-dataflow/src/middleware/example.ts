import {Action, applyMiddleware,  createStore} from 'redux'

import { skedoReduxMiddleware, combineReducers } from './skedo-redux'


type UserAction = {
} & Action<any>

function reducer(state : UserState = {logined: "not login"}, action : UserAction){

  switch(action.type) {
    case "CHECK_LOGIN_STATUS":
      return {
        ...state,
        logined : isUserLoggedIn
      }
    case "CHECK_USER_ORDERS" : 
      return {
        ...state,
        orders : getUserOrders
      }
  }
  return state
}

function *getUserOrders() {
  yield {price : 100}
  yield {price : 200}
  yield {price : 300}
  yield {price : 400}
  yield {price : 500}
}


const combined = combineReducers({
  user : reducer
})

const userStore = createStore(combined, applyMiddleware(skedoReduxMiddleware))

type Async<T> = Promise<T> | Generator<T> | T
type UserState = {
  logined : string | (() => Async<string>)
}

function isUserLoggedIn(){
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve("user is loggedin")
    }, 1000)
  })
  
}


userStore.subscribe(() => {
  console.log('state changed', userStore.getState())
})

userStore.dispatch({
  type : 'CHECK_LOGIN_STATUS'
})

userStore.dispatch({
  type : 'CHECK_USER_ORDERS'
})





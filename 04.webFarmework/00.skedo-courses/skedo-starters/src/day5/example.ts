
import {Action, applyMiddleware, createStore} from 'redux'
import {combineReducers, skedoReduxMiddleWare} from './skedo-redux'

type Async<T> = Promise<T> | Generator<T> | (() => Promise<T>) | (() => Generator<T>) | T
type UserAction = {
} & Action<any>
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

function reducer(state : UserState = {logined: "not login"}, action : UserAction){

  switch(action.type) {
    case "CHECK_LOGIN_STATUS":
      return {
        ...state,
        logined : isUserLoggedIn
      }
  }
  return state
}

const reducers = combineReducers({
	user : reducer
})
const userStore = createStore(reducers, applyMiddleware(skedoReduxMiddleWare))

userStore.subscribe(() => {
  console.log('state changed', userStore.getState())
})

userStore.dispatch({
  type : 'CHECK_LOGIN_STATUS'
})
import {Action, combineReducers as _rawCombine, applyMiddleware, CombinedState, createStore, Reducer, ReducersMapObject } from 'redux'
import asyncRunner from './asyncRunner'

type AsyncWork = {
  path : Array<any>,
  todo : any
}
function *asyncWorks(state : any, path : Array<any> = []) : Generator<AsyncWork, void> {

  const work : AsyncWork[] = []
  if(typeof state === 'function') {
    yield {
      path,
      todo : state()
    }
  }

  if(typeof state !== 'object') {
    return
  }

  if(state instanceof Promise || state[Symbol.iterator]) {
    yield {
      path,
      todo : state
    }
  }

  for(let key in state) {
    yield * asyncWorks(state[key], path.concat(key))
  }
}



type ChangeStateAction = {
  state : any
} & Action<any>
function __changeStateReducer (state : any, action : ChangeStateAction) {
  if(action.type === '@__State') {
    return action.state 
  }
  return state
}



function deepSet(obj : any, path : Array<any>, value : any, i = 0) {
  const key = path[i]
  if(key === undefined) {
    return value 
  }
  obj[key] = deepSet(obj[key], path, value, i+1)
  return obj
}



let combined : any 
export function combineReducers(
  reducers: any 
	
) {

	for(let key in reducers) {

    console.log(reducers[key])
    const fn = reducers[key]
		reducers[key] = (state : any, action : any) => {
			state = fn(state, action)
			state = __changeStateReducer(state, action)
      return state
		}
	}
  combined = _rawCombine(reducers)
  return combined
}


let pendingNextState :any
let ver = 0
export const skedoReduxMiddleware = (store : any) => (next : any) => (action : any) => {
  const oldState = store.getState()

  const localVer = ++ver

  if(!pendingNextState) {
	  pendingNextState = combined(oldState, action) 
  } else {
	  pendingNextState = combined(pendingNextState, action) 
  }
  console.log(localVer, pendingNextState)

  const works : Array<AsyncWork> = [...asyncWorks(pendingNextState)]
  if(works.length > 0) {

    asyncRunner(function *() {
      for(let work of works) {
        if(localVer !== ver) {
          break
        }
        console.log('do work', localVer)
        const result = yield work.todo
        pendingNextState = deepSet(pendingNextState, work.path, result)
      }

      if(localVer === ver) {
        return next({
          type : "@__State",
          state : pendingNextState 
        })
      } else {
        console.log("discard this works", localVer)
      }
      
    })
    // return oldState
    return
  }
  return next(action) 
}




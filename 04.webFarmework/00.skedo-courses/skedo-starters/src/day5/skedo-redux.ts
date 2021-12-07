import {combineReducers as _combineReducers} from 'redux'
import { asyncRunner } from './asyncRunner'
let combinedReducers : any

function __changeStateReducer(state : any, action : any) {
	if(action.type === '@__State') {
		return action.state
	}
	return state
}

type AsyncWork = {
  path : Array<any>,
  todo : any
}

function deepSet(obj : any, path : Array<any>, value : any, i = 0) {
	const key = path[i]

	if(key === undefined) {
		return value
	}
	obj[key] = deepSet(obj[key], path, value, i+1)
	return obj
}

function * asyncWorkers(state : any, path : Array<any> = []) : Generator<AsyncWork, void>{

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
		yield * asyncWorkers(state[key], path.concat(key))
	}
}

export function combineReducers(reducers : any) {

	for(let key in reducers) {
		const reducer = reducers[key]

		reducers[key] = (state : any, action : any) => {
			state = reducer(state, action)
			state = __changeStateReducer(state, action)
			return state
		}
	}
	combinedReducers = _combineReducers(reducers)
	return combinedReducers
}

export const skedoReduxMiddleWare =
  (store: any) => (dispatch: any) => (action: any) => {
		const oldState = store.getState()
		let nextState = combinedReducers(oldState, action)
		const works = [...asyncWorkers(nextState)]

		if(works.length > 0) {
			asyncRunner(function *() {
				for(let work of works) {
					const result = yield work.todo
					nextState = deepSet(nextState, work.path, result)
				}

				dispatch({
					type : "@__State",
					state : nextState
				})
			})
		} else {
			dispatch(action)
		}
	}



import { combineReducers as _combineReducers } from 'redux'
import { asyncRunner } from './asyncRunner'
let combinedReducers: any

function __changeStateReducer(state: any, action: any) {
	if (action.type === '@__State') {
		return action.state
	}
	return state
}

type AsyncWork = {
	path: Array<any>,
	todo: any
}

//* 深度数据复制
function deepSet(obj: any, path: Array<any>, value: any, i = 0) {
	const key = path[i]

	if (key === undefined) {
		return value
	}
	obj[key] = deepSet(obj[key], path, value, i + 1)
	return obj
}


//! 4 - 把所有的异步操作使用yield操作，在中间件中全部放到了数组里
function* asyncWorkers(state: any, path: Array<any> = []): Generator<AsyncWork, void> {

	if (typeof state === 'function') {
		yield {
			path,
			todo: state()
		}
	}

	if (typeof state !== 'object') {
		return
	}

	if (state instanceof Promise || state[Symbol.iterator]) {
		yield {
			path,
			todo: state
		}
	}

	for (let key in state) {
		yield* asyncWorkers(state[key], path.concat(key))
	}
}
//! createStore前，用来合并了reducer
export function combineReducers(reducers: any) {

	for (let key in reducers) {
		const reducer = reducers[key]

		reducers[key] = (state: any, action: any) => {
			state = reducer(state, action)
			state = __changeStateReducer(state, action) // 如果有异步任务，在这里state被换成了antion中的state
			return state
		}
	}
	combinedReducers = _combineReducers(reducers) //TODO 不知道还干啥的
	return combinedReducers
}

//! 3 - 中间件触发，找出异步数据分别处理，redux先走中间件，处理完之后才走原本的reducer
export const skedoReduxMiddleWare = (store: any) => (dispatch: any) => (action: any) => {
	const oldState = store.getState()
	let nextState = combinedReducers(oldState, action)
	const works = [...asyncWorkers(nextState)]

	// 如果我们有任务，就使用asyncRunner进行处理
	if (works.length > 0) {
		asyncRunner(function* () {
			for (let work of works) {
				const result = yield work.todo
				nextState = deepSet(nextState, work.path, result)
			}
			dispatch({
				type: "@__State",
				state: nextState
			})
		})
	} else {
		dispatch(action)
	}
}
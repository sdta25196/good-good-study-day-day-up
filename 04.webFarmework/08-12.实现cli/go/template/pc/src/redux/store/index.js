import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'
let store = createStore(reducer, applyMiddleware(thunk, createLogger))

export default store
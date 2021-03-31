import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import rootReducer from './reducer/index'

const middleware = applyMiddleware(promise, thunk, logger)
const store = createStore(rootReducer, middleware)

export default store
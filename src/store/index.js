import { createStore, applyMiddleware } from 'redux'

import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import appReducer from '../reducers'

const loggerMiddleware = createLogger()
const routerMiddlewareWithHistory = routerMiddleware(browserHistory)

const store = createStore(
  appReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    routerMiddlewareWithHistory
  )
)

export default store

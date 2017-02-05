import { createStore, applyMiddleware } from 'redux'

import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import appReducer from '../reducers'

const middlewares = [
  thunkMiddleware,
  routerMiddleware(browserHistory)
]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

const store = createStore(
  appReducer,
  applyMiddleware(
    ...middlewares
  )
)

export default store

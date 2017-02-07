import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import boards from './boards'
import richBoards from './richBoards'
import error from './error'

const appReducer = combineReducers({
  auth,
  boards,
  richBoards,
  error,
  routing: routerReducer
})

export default appReducer

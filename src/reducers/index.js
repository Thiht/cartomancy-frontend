import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import boards from './boards'

const appReducer = combineReducers({
  boards,
  routing: routerReducer
})

export default appReducer

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import boards from './boards'
import richBoards from './richBoards'

const appReducer = combineReducers({
  boards,
  richBoards,
  routing: routerReducer
})

export default appReducer

import { REQUEST_BOARD, RECEIVE_BOARD_SUCCESS, RECEIVE_BOARD_FAIL } from '../actions/board'
import { RECEIVE_CREATE_LIST_SUCCESS } from '../actions/list'
import { RECEIVE_CREATE_CARD_SUCCESS, RECEIVE_MOVE_CARD_SUCCESS } from '../actions/card'

const board = (state = {
  isFetching: false,
  didInvalidate: true,
  data: {}
}, action) => {
  switch (action.type) {
    case REQUEST_BOARD:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.board
      }
    case RECEIVE_BOARD_FAIL:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const richBoards = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_BOARD:
    case RECEIVE_BOARD_SUCCESS:
    case RECEIVE_BOARD_FAIL:
      return {
        ...state,
        [action.boardID]: board(state[action.boardID], action)
      }
    case RECEIVE_CREATE_LIST_SUCCESS:
    case RECEIVE_CREATE_CARD_SUCCESS:
    case RECEIVE_MOVE_CARD_SUCCESS:
      return {
        ...state,
        [action.board._id]: {
          ...state[action.board._id],
          data: action.board
        }
      }
    default:
      return state
  }
}

export default richBoards

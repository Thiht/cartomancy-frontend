import { RECEIVE_UPDATE_BOARD_SUCCESS, REQUEST_BOARD, RECEIVE_BOARD_SUCCESS, RECEIVE_BOARD_FAIL } from '../actions/board'

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
    case RECEIVE_UPDATE_BOARD_SUCCESS:
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

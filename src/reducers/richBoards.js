import { REQUEST_BOARD, RECEIVE_BOARD_SUCCESS, RECEIVE_BOARD_FAIL } from '../actions/board'

const board = (state = {
  isFetching: false,
  didInvalidate: true,
  data: {},
  error: null
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
        data: action.board,
        error: null
      }
    case RECEIVE_BOARD_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
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
    default:
      return state
  }
}

export default richBoards

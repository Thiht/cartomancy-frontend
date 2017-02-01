import { INVALIDATE_BOARDS, REQUEST_BOARDS, RECEIVE_BOARDS_SUCCESS, RECEIVE_BOARDS_FAIL } from '../actions/boards'

const boards = (state = {
  isFetching: false,
  didInvalidate: true,
  data: [],
  error: null
}, action) => {
  switch (action.type) {
    case INVALIDATE_BOARDS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_BOARDS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_BOARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.boards,
        error: null
      }
    case RECEIVE_BOARDS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

export default boards

import { REQUEST_BOARDS, RECEIVE_BOARDS_SUCCESS, RECEIVE_BOARDS_FAIL } from '../actions'

const boards = (state = {
  isFetching: false,
  data: [],
  error: null
}, action) => {
  console.log(action)
  switch (action.type) {
    case REQUEST_BOARDS:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case RECEIVE_BOARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
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

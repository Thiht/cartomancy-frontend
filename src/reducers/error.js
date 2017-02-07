import { RECEIVE_SIGN_IN_FAIL, RECEIVE_REGISTER_FAIL, RECEIVE_AUTH_USER_FAIL } from '../actions/auth'
import { RECEIVE_BOARDS_FAIL } from '../actions/boards'
import { RECEIVE_BOARD_FAIL } from '../actions/board'
import { RECEIVE_CREATE_LIST_FAIL } from '../actions/list'
import { RECEIVE_CREATE_CARD_FAIL, RECEIVE_MOVE_CARD_FAIL, RECEIVE_UPDATE_CARD_FAIL } from '../actions/card'

const error = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_SIGN_IN_FAIL:
    case RECEIVE_REGISTER_FAIL:
    case RECEIVE_BOARDS_FAIL:
    case RECEIVE_BOARD_FAIL:
    case RECEIVE_CREATE_LIST_FAIL:
    case RECEIVE_CREATE_CARD_FAIL:
    case RECEIVE_MOVE_CARD_FAIL:
    case RECEIVE_UPDATE_CARD_FAIL:
    case RECEIVE_AUTH_USER_FAIL:
      return action.error
    default:
      return state
  }
}

export default error

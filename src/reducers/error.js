import { RECEIVE_BOARDS_FAIL } from '../actions/boards'
import { RECEIVE_BOARD_FAIL } from '../actions/board'
import { RECEIVE_CREATE_LIST_FAIL } from '../actions/list'
import { RECEIVE_CREATE_CARD_FAIL, RECEIVE_UPDATE_CARD_FAIL } from '../actions/card'

const error = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_BOARDS_FAIL:
    case RECEIVE_BOARD_FAIL:
    case RECEIVE_CREATE_LIST_FAIL:
    case RECEIVE_CREATE_CARD_FAIL:
    case RECEIVE_UPDATE_CARD_FAIL:
      return action.error
    default:
      return state
  }
}

export default error

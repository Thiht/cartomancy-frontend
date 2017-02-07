import {
  REQUEST_SIGN_IN, RECEIVE_SIGN_IN_SUCCESS, RECEIVE_SIGN_IN_FAIL,
  REQUEST_REGISTER, RECEIVE_REGISTER_SUCCESS, RECEIVE_REGISTER_FAIL,
  RECEIVE_AUTH_USER_SUCCESS
} from '../actions/auth'

const auth = (state = {
  isFetching: false,
  didInvalidate: true,
  user: {}
}, action) => {
  switch (action.type) {
    case REQUEST_SIGN_IN:
    case REQUEST_REGISTER:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_SIGN_IN_SUCCESS:
    case RECEIVE_REGISTER_SUCCESS:
    case RECEIVE_AUTH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        user: action.authUser
      }
    case RECEIVE_SIGN_IN_FAIL:
    case RECEIVE_REGISTER_FAIL:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export default auth

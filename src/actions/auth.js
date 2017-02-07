import fetch from 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN'
const requestSignIn = () => ({
  type: REQUEST_SIGN_IN
})

export const RECEIVE_SIGN_IN_SUCCESS = 'RECEIVE_SIGN_IN_SUCCESS'
const receiveSignInSuccess = authUser => ({
  type: RECEIVE_SIGN_IN_SUCCESS,
  authUser
})

export const RECEIVE_SIGN_IN_FAIL = 'RECEIVE_SIGN_IN_FAIL'
const receiveSignInFail = error => ({
  type: RECEIVE_SIGN_IN_FAIL,
  error
})

export const signIn = (username, password) => dispatch => {
  dispatch(requestSignIn())
  return new Promise((resolve, reject) =>
    fetch(`http://${SERVER_URL}/api/tokens`, {
      method: 'POST',
      body: `username=${encodeURI(username)}&password=${encodeURI(password)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(authUser => {
        localStorage.setItem('cartomancy-jwt-token', authUser.token)
        dispatch(receiveSignInSuccess(authUser.authenticatedUser))
      })
      .catch(error => dispatch(receiveSignInFail(error.message)))
  )
}

export const REQUEST_REGISTER = 'REQUEST_REGISTER'
const requestRegister = () => ({
  type: REQUEST_REGISTER
})

export const RECEIVE_REGISTER_SUCCESS = 'RECEIVE_REGISTER_SUCCESS'
const receiveRegisterSuccess = authUser => ({
  type: RECEIVE_REGISTER_SUCCESS,
  authUser
})

export const RECEIVE_REGISTER_FAIL = 'RECEIVE_REGISTER_FAIL'
const receiveRegisterFail = error => ({
  type: RECEIVE_REGISTER_FAIL,
  error
})

export const register = (username, password, email, firstName, lastName) => dispatch => {
  dispatch(requestRegister())
  return new Promise((resolve, reject) =>
    fetch(`http://${SERVER_URL}/api/users`, {
      method: 'POST',
      body: `username=${encodeURI(username)}&password=${encodeURI(password)}&email=${encodeURI(email)}&firstName=${encodeURI(firstName)}&lastName=${encodeURI(lastName)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(authUser => {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}-jwt-token`, authUser.token)
        dispatch(receiveRegisterSuccess(authUser.authenticatedUser))
      })
      .catch(error => dispatch(receiveRegisterFail(error.message)))
  )
}

export const REQUEST_AUTH_USER = 'REQUEST_AUTH_USER'
const requestAuthUser = () => ({
  type: REQUEST_AUTH_USER
})

export const RECEIVE_AUTH_USER_SUCCESS = 'RECEIVE_AUTH_USER_SUCCESS'
const receiveAuthUserSuccess = authUser => ({
  type: RECEIVE_AUTH_USER_SUCCESS,
  authUser
})

export const RECEIVE_AUTH_USER_FAIL = 'RECEIVE_AUTH_USER_FAIL'
const receiveAuthUserFail = error => ({
  type: RECEIVE_AUTH_USER_FAIL,
  error
})

export const fetchAuthUser = jwtToken => dispatch => {
  dispatch(requestAuthUser())
  const { userID } = jwtDecode(jwtToken)
  return new Promise((resolve, reject) =>
    fetch(`http://${SERVER_URL}/api/users/${userID}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(authUser => dispatch(receiveAuthUserSuccess(authUser)))
      .catch(error => dispatch(receiveAuthUserFail(error.message)))
  )
}

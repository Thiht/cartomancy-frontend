import fetch from 'isomorphic-fetch'

export const REQUEST_UPDATE_CARD = 'REQUEST_UPDATE_CARD'
const requestUpdateCard = () => ({
  type: REQUEST_UPDATE_CARD
})

export const RECEIVE_UPDATE_CARD_SUCCESS = 'RECEIVE_UPDATE_CARD_SUCCESS'
const receiveUpdateCardSuccess = board => ({
  type: RECEIVE_UPDATE_CARD_SUCCESS,
  board
})

export const RECEIVE_UPDATE_CARD_FAIL = 'RECEIVE_UPDATE_CARD_FAIL'
const receiveUpdateCardFail = error => ({
  type: RECEIVE_UPDATE_CARD_FAIL,
  error
})

export const updateCard = (boardID, listID, cardID, newTitle) => dispatch => {
  dispatch(requestUpdateCard())
  return new Promise((resolve, reject) =>
    fetch(`http://localhost:8090/api/boards/${boardID}/lists/${listID}/cards/${cardID}`, {
      method: 'PUT',
      body: `title=${encodeURI(newTitle)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }) // TODO: make the URL configurable
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(board => dispatch(receiveUpdateCardSuccess(board)))
      .catch(error => dispatch(receiveUpdateCardFail(error.message)))
  )
}

export const REQUEST_MOVE_CARD = 'REQUEST_MOVE_CARD'
const requestMoveCard = () => ({
  type: REQUEST_MOVE_CARD
})

export const RECEIVE_MOVE_CARD_SUCCESS = 'RECEIVE_MOVE_CARD_SUCCESS'
const receiveMoveCardSuccess = board => ({
  type: RECEIVE_MOVE_CARD_SUCCESS,
  board
})

export const RECEIVE_MOVE_CARD_FAIL = 'RECEIVE_MOVE_CARD_FAIL'
const receiveMoveCardFail = error => ({
  type: RECEIVE_MOVE_CARD_FAIL,
  error
})

export const moveCard = (boardID, listID, cardID, newListID) => dispatch => {
  dispatch(requestMoveCard())
  return new Promise((resolve, reject) =>
    fetch(`http://localhost:8090/api/boards/${boardID}/lists/${listID}/cards/${cardID}`, {
      method: 'PUT',
      body: `newListID=${encodeURI(newListID)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }) // TODO: make the URL configurable
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(board => dispatch(receiveMoveCardSuccess(board)))
      .catch(error => dispatch(receiveMoveCardFail(error.message)))
  )
}

export const REQUEST_CREATE_CARD = 'REQUEST_CREATE_CARD'
const requestCreateCard = () => ({
  type: REQUEST_CREATE_CARD
})

export const RECEIVE_CREATE_CARD_SUCCESS = 'RECEIVE_CREATE_CARD_SUCCESS'
const receiveCreateCardSuccess = board => ({
  type: RECEIVE_CREATE_CARD_SUCCESS,
  board
})

export const RECEIVE_CREATE_CARD_FAIL = 'RECEIVE_CREATE_CARD_FAIL'
const receiveCreateCardFail = error => ({
  type: RECEIVE_CREATE_CARD_FAIL,
  error
})

export const createCard = (boardID, listID, title) => dispatch => {
  dispatch(requestCreateCard())
  return new Promise((resolve, reject) =>
    fetch(`http://localhost:8090/api/boards/${boardID}/lists/${listID}/cards`, {
      method: 'POST',
      body: `title=${encodeURI(title)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }) // TODO: make the URL configurable
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(board => dispatch(receiveCreateCardSuccess(board)))
      .catch(error => dispatch(receiveCreateCardFail(error.message)))
  )
}

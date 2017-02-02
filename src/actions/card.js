import fetch from 'isomorphic-fetch'

export const REQUEST_UPDATE_CARD = 'REQUEST_UPDATE_CARD'
const requestUpdateCard = () => ({
  type: REQUEST_UPDATE_CARD
})

export const RECEIVE_UPDATE_CARD_SUCCESS = 'RECEIVE_UPDATE_CARD_SUCCESS'
const receiveUpdateCardSuccess = card => ({
  type: RECEIVE_UPDATE_CARD_SUCCESS,
  card
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
          throw Error(response.message)
        }
        return response
      })
      .then(response => response.json())
      .then(card => dispatch(receiveUpdateCardSuccess(card)))
      .catch(error => dispatch(receiveUpdateCardFail(error)))
  )
}

import fetch from 'isomorphic-fetch'

export const REQUEST_CREATE_LIST = 'REQUEST_CREATE_LIST'
const requestCreateList = () => ({
  type: REQUEST_CREATE_LIST
})

export const RECEIVE_CREATE_LIST_FAIL = 'RECEIVE_CREATE_LIST_FAIL'
const receiveCreateListFail = error => ({
  type: RECEIVE_CREATE_LIST_FAIL,
  error
})

export const createList = (boardID, title) => dispatch => {
  dispatch(requestCreateList())
  return new Promise((resolve, reject) =>
    fetch(`http://${SERVER_URL}/api/boards/${boardID}/lists/`, {
      method: 'POST',
      body: `title=${encodeURI(title)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .catch(error => dispatch(receiveCreateListFail(error.message)))
  )
}

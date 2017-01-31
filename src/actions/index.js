import fetch from 'isomorphic-fetch'

export const REQUEST_BOARDS = 'REQUEST_BOARDS'
const requestBoards = () => ({
  type: REQUEST_BOARDS
})

export const RECEIVE_BOARDS_SUCCESS = 'RECEIVE_BOARDS_SUCCESS'
const receiveBoardsSuccess = boards => ({
  type: RECEIVE_BOARDS_SUCCESS,
  boards
})

export const RECEIVE_BOARDS_FAIL = 'RECEIVE_BOARDS_FAIL'
const receiveBoardsFail = error => ({
  type: RECEIVE_BOARDS_FAIL,
  error
})

// TODO: fetchBoardsIfNeeded
export const fetchBoardsThunk = () => dispatch => {
  dispatch(requestBoards())
  return new Promise((resolve, reject) =>
    fetch('http://localhost:8090/api/boards')
      .then(response => {
        if (!response.ok) {
          throw Error(response.message)
        }
        return response
      })
      .then(response => response.json())
      .then(boards => dispatch(receiveBoardsSuccess(boards)))
      .catch(error => dispatch(receiveBoardsFail(error)))
  )
}

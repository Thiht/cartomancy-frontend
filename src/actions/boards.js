import fetch from 'isomorphic-fetch'

export const INVALIDATE_BOARDS = 'INVALIDATE_BOARDS'

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

const fetchBoards = () => dispatch => {
  dispatch(requestBoards())
  return new Promise((resolve, reject) =>
    fetch(`http://${SERVER_URL}/api/boards`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(boards => dispatch(receiveBoardsSuccess(boards)))
      .catch(error => dispatch(receiveBoardsFail(error.message)))
  )
}

const shouldFetchBoards = state => {
  const { boards } = state
  if (boards.isFetching) {
    return false
  }
  return boards.didInvalidate
}

export const fetchBoardsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchBoards(getState())) {
    dispatch(fetchBoards())
  } else {
    return Promise.resolve()
  }
}

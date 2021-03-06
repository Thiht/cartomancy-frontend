import fetch from 'isomorphic-fetch'

// This action is used with the websocket since every update (cards, lists)
// triggers the writing of the updated board on the websocket
export const RECEIVE_UPDATE_BOARD_SUCCESS = 'RECEIVE_UPDATE_BOARD_SUCCESS'
export const receiveUpdateBoardSuccess = board => ({
  type: RECEIVE_UPDATE_BOARD_SUCCESS,
  board
})

export const REQUEST_BOARD = 'REQUEST_BOARD'
const requestBoard = boardID => ({
  type: REQUEST_BOARD,
  boardID
})

export const RECEIVE_BOARD_SUCCESS = 'RECEIVE_BOARD_SUCCESS'
const receiveBoardSuccess = (boardID, board) => ({
  type: RECEIVE_BOARD_SUCCESS,
  boardID,
  board
})

export const RECEIVE_BOARD_FAIL = 'RECEIVE_BOARD_FAIL'
const receiveBoardFail = (boardID, error) => ({
  type: RECEIVE_BOARD_FAIL,
  boardID,
  error
})

const fetchBoard = boardID => dispatch => {
  dispatch(requestBoard(boardID))
  return new Promise((resolve, reject) =>
    fetch(`http://${SERVER_URL}/api/boards/${boardID}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(board => dispatch(receiveBoardSuccess(boardID, board)))
      .catch(error => dispatch(receiveBoardFail(boardID, error.message)))
  )
}

const shouldFetchBoard = (state, boardID) => {
  const board = state.richBoards[boardID]
  if (!board) {
    return true
  }
  if (board.isFetching) {
    return false
  }
  return board.didInvalidate
}

export const fetchBoardIfNeeded = boardID => (dispatch, getState) => {
  if (shouldFetchBoard(getState(), boardID)) {
    dispatch(fetchBoard(boardID))
  } else {
    return Promise.resolve()
  }
}

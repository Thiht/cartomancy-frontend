import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchBoardIfNeeded, receiveUpdateBoardSuccess } from '../actions/board'

import DocumentTitle from 'react-document-title'
import List from './List'
import NewList from './NewList'
import './Board.css'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class BoardComponent extends Component {
  static propTypes = {
    board: PropTypes.object.isRequired,
    params: PropTypes.object,
    fetchBoard: PropTypes.func.isRequired,
    receiveUpdateBoardSuccess: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    const { boardID } = props.params
    const ws = new WebSocket(`ws://localhost:8090/ws?topic=${boardID}`) // TODO: make the URL configurable
    ws.onmessage = ({ data }) => {
      const board = JSON.parse(data)
      props.receiveUpdateBoardSuccess(board)
    }
    this.state = {
      ws
    }
  }

  componentWillMount () {
    this.props.fetchBoard()
  }

  componentWillUpdate (nextProps) {
    nextProps.fetchBoard()
  }

  componentWillUnmount () {
    this.state.ws.close()
  }

  render () {
    const { board } = this.props

    // TODO: add a dimmer/loader + handle isFetching
    if (!board || (Object.keys(board).length === 0 && board.constructor === Object)) {
      return <div />
    }
    return (
      <DocumentTitle title={board.title}>
        <div className='cartomancy-board'>
          {board.lists.map(list => (
            <List key={list._id} title={list.title} cards={list.cards} id={list._id} boardID={board._id} />
          ))}
          <NewList boardID={board._id} />
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ richBoards }, { params }) => {
  return {
    board: richBoards[params.boardID] ? richBoards[params.boardID].data : {}
  }
}

const mapDispatchToProps = (dispatch, { params }) => ({
  fetchBoard () {
    dispatch(fetchBoardIfNeeded(params.boardID))
  },
  receiveUpdateBoardSuccess (board) {
    dispatch(receiveUpdateBoardSuccess(board))
  }
})

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComponent)

export default DragDropContext(HTML5Backend)(Board)

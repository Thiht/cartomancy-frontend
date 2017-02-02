import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchBoardIfNeeded } from '../actions/board'

import DocumentTitle from 'react-document-title'
import List from './List'
import './Board.css'

class BoardComponent extends Component {
  static propTypes = {
    board: PropTypes.object.isRequired,
    fetchBoard: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.fetchBoard()
  }

  componentWillUpdate (nextProps) {
    nextProps.fetchBoard()
  }

  render () {
    const { board } = this.props

    // TODO: add a dimmer/loader + handle isFetching
    if (!board || (Object.keys(board).length === 0 && board.constructor === Object)) {
      return <div />
    }
    console.log(board)
    return (
      <DocumentTitle title={board.title}>
        <div className='cartomancy-board'>
          {board.lists.map(list => (
            <List key={list._id} title={list.title} cards={list.cards} id={list._id} boardID={board._id} />
          ))}
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
  }
})

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComponent)

export default Board

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateCard, removeCard } from '../actions/card'

import { Input } from 'semantic-ui-react'
import './Card.css'

import { DragSource } from 'react-dnd'

class CardComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    listID: PropTypes.string.isRequired,
    boardID: PropTypes.string.isRequired,
    updateCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  onBlur (e) {
    const field = e.target

    // Move the cursor to the beginning of the field
    field.setSelectionRange(0, 0)

    const defaultTitle = field.defaultValue.trim()
    const newTitle = field.value.trim()
    if (newTitle === defaultTitle) {
      return
    }
    const { id, listID, boardID, updateCard, removeCard } = this.props
    if (newTitle.trim() === '') {
      removeCard(boardID, listID, id)
    } else {
      updateCard(boardID, listID, id, newTitle)
    }
  }

  render () {
    const { connectDragSource, isDragging } = this.props
    const title = this.props.title.trim()
    return connectDragSource(
      <div className='cartomancy-card' style={{
        opacity: isDragging ? 0 : 1
      }}>
        <Input fluid transparent defaultValue={title} onBlur={this.onBlur.bind(this)} />
      </div>
    )
  }
}

const cardSource = {
  beginDrag (props) {
    return {
      id: props.id,
      listID: props.listID,
      boardID: props.boardID
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const mapDispatchToProps = dispatch => ({
  updateCard (boardID, listID, cardID, newTitle) {
    dispatch(updateCard(boardID, listID, cardID, newTitle))
  },

  removeCard (boardID, listID, cardID) {
    dispatch(removeCard(boardID, listID, cardID))
  }
})

const Card = connect(
  undefined,
  mapDispatchToProps
)(CardComponent)

export default DragSource('card', cardSource, collect)(Card)

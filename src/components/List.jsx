import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { moveCard } from '../actions/card'

import Card from './Card'
import NewCard from './NewCard'
import { Scrollbars } from 'react-custom-scrollbars'
import './List.css'

import { DropTarget } from 'react-dnd'

const ListComponent = ({
  title,
  cards,
  id,
  boardID,
  connectDropTarget,
  isOver
}) => connectDropTarget(
  <div className='cartomancy-list' style={{
    backgroundColor: isOver ? '#ddd' : ''
  }}>
    <h2>{title}</h2>
      <div className='cartomancy-cards'>
        <Scrollbars autoHide>
          {cards.map(card => (
            <Card key={card._id} title={card.title} id={card._id} listID={id} boardID={boardID} />
          ))}
          <NewCard listID={id} boardID={boardID} />
        </Scrollbars>
      </div>
  </div>
)

ListComponent.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  boardID: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired
}

const listTarget = {
  drop (props, monitor) {
    const sourceCard = monitor.getItem()
    props.moveCard(sourceCard.boardID, sourceCard.listID, sourceCard.id, props.id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

const mapDispatchToProps = dispatch => ({
  moveCard (boardID, listID, cardID, newListID) {
    dispatch(moveCard(boardID, listID, cardID, newListID))
  }
})

const DroppableListComponent = DropTarget('card', listTarget, collect)(ListComponent)

const List = connect(
  undefined,
  mapDispatchToProps
)(DroppableListComponent)

export default List

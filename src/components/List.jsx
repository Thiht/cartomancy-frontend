import React, { PropTypes } from 'react'

import Card from './Card'
import './List.css'

const List = ({
  title,
  cards,
  id,
  boardID
}) => (
  <div className='cartomancy-list'>
    <h2>{title}</h2>
    <div className='cartomancy-cards'>
      {cards.map(card => (
        <Card key={card._id} title={card.title} id={card._id} listID={id} boardID={boardID} />
      ))}
    </div>
  </div>
)

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  boardID: PropTypes.string.isRequired
}

export default List

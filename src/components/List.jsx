import React, { PropTypes } from 'react'

import Card from './Card'
import './List.css'

const List = ({
  title,
  cards
}) => (
  <div className='cartomancy-list'>
    <h2>{title}</h2>
    <div className='cartomancy-cards'>
      {cards.map(card => (
        <Card key={card._id} title={card.title} />
      ))}
    </div>
  </div>
)

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
}

export default List

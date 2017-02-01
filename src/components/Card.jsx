import React, { PropTypes } from 'react'

import './Card.css'

const Card = ({
  title
}) => (
  <div className='cartomancy-card'>
      <h3>{title}</h3>
  </div>
)

Card.propTypes = {
  title: PropTypes.string.isRequired
}

export default Card

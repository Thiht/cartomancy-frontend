import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import { updateCard } from '../actions/card'

import { Input } from 'semantic-ui-react'
import './Card.css'

class CardComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    listID: PropTypes.string.isRequired,
    boardID: PropTypes.string.isRequired,
    updateCard: PropTypes.func.isRequired
  }

  onBlur (e) {
    const field = e.target

    // Move the cursor to the beginning of the field
    field.setSelectionRange(0, 0)
    field.focus()

    const defaultTitle = field.defaultValue.trim()
    const newTitle = field.value.trim()
    if (newTitle === defaultTitle) {
      return
    }
    const { id, listID, boardID, updateCard } = this.props
    updateCard(boardID, listID, id, newTitle)
  }

  render () {
    const title = this.props.title.trim()
    return (
      <div className='cartomancy-card'>
        <Input fluid transparent defaultValue={title} onBlur={this.onBlur.bind(this)} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCard (boardID, listID, cardID, newTitle) {
    dispatch(updateCard(boardID, listID, cardID, newTitle))
  }
})

const Card = connect(
  undefined,
  mapDispatchToProps
)(CardComponent)

export default Card

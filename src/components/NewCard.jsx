import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createCard } from '../actions/card'

import { Button, Icon, Input } from 'semantic-ui-react'
import './Card'

class NewCardComponent extends Component {
  static propTypes = {
    listID: PropTypes.string.isRequired,
    boardID: PropTypes.string.isRequired,
    createCard: PropTypes.func.isRequired
  }

  state = {
    active: false
  }

  onClick () {
    this.setState({
      active: true
    })
  }

  handleCreateCard (title) {
    this.setState({
      active: false
    })
    title = title.trim()
    if (title === '') {
      return
    }
    const { boardID, listID } = this.props
    this.props.createCard(boardID, listID, title)
  }

  onBlur (e) {
    this.handleCreateCard(e.target.value)
  }

  onKeyDown (e) {
    switch (e.key) {
      case 'Enter':
        this.handleCreateCard(e.target.value)
        return
      case 'Esc':
      case 'Escape':
        this.handleCreateCard('')
        break
      default:
        break
    }
  }

  render () {
    if (this.state.active) {
      return (
        <div className='cartomancy-card'>
          <Input
            fluid transparent autoFocus placeholder='New Card'
            onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)}
          />
        </div>
      )
    } else {
      return (
        <Button color='blue' fluid onClick={this.onClick.bind(this)}>
          <Icon name='plus' />
        </Button>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createCard (boardID, listID, title) {
    dispatch(createCard(boardID, listID, title))
  }
})

const NewCard = connect(
  undefined,
  mapDispatchToProps
)(NewCardComponent)

export default NewCard

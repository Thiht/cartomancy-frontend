import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createList } from '../actions/list'

import { Button, Icon, Input } from 'semantic-ui-react'
import './List'

class NewListComponent extends Component {
  static propTypes = {
    boardID: PropTypes.string.isRequired,
    createList: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  onClick () {
    this.setState({
      active: true
    })
  }

  handleCreateList (title) {
    this.setState({
      active: false
    })
    title = title.trim()
    if (title === '') {
      return
    }
    const { boardID } = this.props
    this.props.createList(boardID, title)
  }

  onBlur (e) {
    this.handleCreateList(e.target.value)
  }

  onKeyDown (e) {
    switch (e.key) {
      case 'Enter':
        this.handleCreateList(e.target.value)
        return
      case 'Esc':
      case 'Escape':
        this.handleCreateList('')
        break
      default:
        break
    }
  }

  render () {
    if (this.state.active) {
      return (
        <div className='cartomancy-list'>
          <h2>
            <Input
              fluid transparent autoFocus placeholder='New List'
              onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)}
            />
          </h2>
        </div>
      )
    } else {
      return (
        <Button onClick={this.onClick.bind(this)}>
          <Icon name='plus' />
        </Button>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createList (boardID, title) {
    dispatch(createList(boardID, title))
  }
})

const NewList = connect(
  undefined,
  mapDispatchToProps
)(NewListComponent)

export default NewList

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchBoardsIfNeeded } from '../actions/boards'

import { Container, Icon, Item } from 'semantic-ui-react'
import './Boards.css'

class BoardsComponent extends Component {
  static propTypes = {
    boards: PropTypes.array.isRequired,
    fetchBoards: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.fetchBoards()
  }

  render () {
    const { boards } = this.props
    return (
      <Container text>
        <Item.Group>
          {boards.map(board =>
            <Item key={board._id} as={Link} to={`/boards/${board._id}`}>
              <Item.Content>
                <Icon name='columns' /> {board.title}
              </Item.Content>
            </Item>
          )}
        </Item.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({ boards }) => ({
  boards: boards.data || []
})

const mapDispatchToProps = dispatch => ({
  fetchBoards () {
    dispatch(fetchBoardsIfNeeded())
  }
})

const Boards = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsComponent)

export default Boards

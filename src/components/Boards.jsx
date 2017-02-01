import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchBoardsIfNeeded } from '../actions/boards'

import { Container, Segment } from 'semantic-ui-react'

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
        <Segment.Group>
          {boards.map(board =>
            <Segment key={board._id}>
              {board.title}
            </Segment>
          )}
        </Segment.Group>
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

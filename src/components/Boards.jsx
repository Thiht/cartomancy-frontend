import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Container, Segment } from 'semantic-ui-react'

import { fetchBoardsIfNeeded } from '../actions'

class BoardsComponent extends Component {
  static propTypes = {
    boards: PropTypes.array,
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
  boards: boards.data
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

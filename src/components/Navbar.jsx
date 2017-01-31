import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'

import { Menu } from 'semantic-ui-react'

import { fetchBoardsThunk } from '../actions'

class NavbarComponent extends Component {
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
      <Menu fixed='top' inverted color='blue' size='mini'>
        <Menu.Item as={IndexLink} to='/'>
          Cartomancy
        </Menu.Item>
        {boards.map(board =>
          <Menu.Item key={board._id}>{board.title}</Menu.Item>
        )}
      </Menu>
    )
  }
}

const mapStateToProps = ({ boards }) => ({
  boards: boards.data
})

const mapDispatchToProps = dispatch => ({
  fetchBoards () {
    dispatch(fetchBoardsThunk())
  }
})

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent)

export default Navbar

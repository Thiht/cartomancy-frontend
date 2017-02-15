import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'

import { fetchBoardsIfNeeded } from '../../actions/boards'

import { Menu } from 'semantic-ui-react'
import AuthMenuItem from './AuthMenuItem'
import './Navbar.css'

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
      <Menu inverted color='blue' size='mini'>
        <Menu.Item header as={IndexLink} to='/' activeClassName='active'>
          Cartomancy
        </Menu.Item>
        {boards.map(board =>
          <Menu.Item key={board._id} as={Link} to={`/boards/${board._id}`} activeClassName='active'>{board.title}</Menu.Item>
        )}
       <AuthMenuItem />
      </Menu>
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

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent)

export default Navbar

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { signIn, register } from '../../actions/auth'
import isEmpty from 'lodash.isempty'

import { Button, Dropdown, Form, Menu, Modal } from 'semantic-ui-react'

class AuthMenItemComponent extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    authUser: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  }

  state = {
    signInModalOpen: false,
    registerModalOpen: false
  }

  handleSignInModalOpen = () => this.setState({ signInModalOpen: true })

  handleSignInModalClose = () => this.setState({ signInModalOpen: false })

  handleRegisterModalOpen = () => this.setState({ registerModalOpen: true })

  handleRegisterModalClose = () => this.setState({ registerModalOpen: false })

  handleSignInSubmit = (e, { formData }) => {
    e.preventDefault()
    this.props.signIn(formData.username, formData.password)
  }

  handleRegisterSubmit = (e, { formData }) => {
    e.preventDefault()
    this.props.register(formData.username, formData.password, formData.email, formData.firstName, formData.lastName)
  }

  renderSignInItem () {
    return (
      <Modal
        trigger={<Menu.Item onClick={this.handleSignInModalOpen}>Sign In</Menu.Item>}
        open={this.state.signInModalOpen}
        onClose={this.handleSignInModalClose}
        size='small'
      >
        <Modal.Header>Sign in using an existing account</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form id='sign-in-form' onSubmit={this.handleSignInSubmit}>
              <Form.Group widths='equal'>
                <Form.Input label='Username' name='username' required />
                <Form.Input label='Password' name='password' required type='password' />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSignInModalClose}>Cancel</Button>
          <Button primary type='submit' form='sign-in-form'>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }

  renderRegisterItem () {
    return (
      <Modal
        trigger={<Menu.Item onClick={this.handleRegisterModalOpen}>Register</Menu.Item>}
        open={this.state.registerModalOpen}
        onClose={this.handleRegisterModalClose}
        size='small'
      >
        <Modal.Header>Register a new account</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form id='sign-in-form' onSubmit={this.handleRegisterSubmit}>
                <Form.Input label='Username' name='username' required />
                <Form.Input label='Password' name='password' required type='password' />
                <Form.Input label='E-mail' name='email' required type='email' />
                <Form.Input label='First Name' name='firstName' />
                <Form.Input label='Last Name' name='lastName' />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleRegisterModalClose}>Cancel</Button>
          <Button primary type='submit' form='sign-in-form'>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }

  renderAuthenticated () {
    const { authUser } = this.props
    const label = authUser.firstName && authUser.lastName ? `${authUser.firstName} ${authUser.lastName}` : authUser.username
    return (
      <Menu.Menu position='right'>
        <Dropdown item text={label}>
            <Dropdown.Menu>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Menu.Menu>
    )
  }

  renderNonAuthenticated () {
    return (
      <Menu.Menu position='right'>
        {this.renderSignInItem()}
        {this.renderRegisterItem()}
      </Menu.Menu>
    )
  }

  render () {
    const { isAuthenticated } = this.props
    return isAuthenticated ? this.renderAuthenticated() : this.renderNonAuthenticated()
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: !isEmpty(auth.user),
  authUser: auth.user
})

const mapDispatchToProps = dispatch => ({
  signIn (username, password) {
    dispatch(signIn(username, password))
  },

  register (username, password, email, firstName, lastName) {
    dispatch(register(username, password, email, firstName, lastName))
  }
})

const AuthMenuItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthMenItemComponent)

export default AuthMenuItem

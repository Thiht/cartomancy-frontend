import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'
import NotificationSystem from 'react-notification-system'
import Navbar from './Navbar'

class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    error: PropTypes.string
  }

  componentDidUpdate () {
    if (this.props.error) {
      this.refs.notificationSystem.addNotification({
        message: this.props.error,
        level: 'error',
        position: 'br'
      })
    }
  }

  render () {
    return (
      <DocumentTitle title='Cartomancy'>
        <div>
          <Navbar />
          {this.props.children}
          <NotificationSystem ref='notificationSystem' />
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ error }) => ({
  error
})

const App = connect(
  mapStateToProps
)(AppComponent)

export default App

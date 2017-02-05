import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'
import NotificationSystem from 'react-notification-system'
import Navbar from './Navbar'

const notificationStyle = {
  NotificationItem: {
    DefaultStyle: {
      borderRadius: '5px',
      borderTop: 'none'
    },
    error: {
      background: '#e74c3c',
      color: '#ecf0f1'
    }
  },
  Title: {
    DefaultStyle: {
      marginBottom: '5px',
      paddingBottom: '5px'
    },
    error: {
      borderBottom: '1px solid #ecf0f1',
      color: '#ecf0f1'
    }
  }
}

class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    error: PropTypes.string
  }

  componentDidUpdate () {
    if (this.props.error) {
      this.refs.notificationSystem.addNotification({
        title: 'Oops, something went wrong!',
        message: this.props.error,
        level: 'error',
        position: 'br',
        dismissible: false
      })
    }
  }

  render () {
    return (
      <DocumentTitle title='Cartomancy'>
        <div>
          <Navbar />
          {this.props.children}
          <NotificationSystem style={notificationStyle} ref='notificationSystem' />
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

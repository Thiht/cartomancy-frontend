import React, { PropTypes } from 'react'

import DocumentTitle from 'react-document-title'
import Navbar from './Navbar'

const App = ({
  children
}) => (
  <DocumentTitle title='Cartomancy'>
    <div>
      <Navbar />
      {children}
    </div>
  </DocumentTitle>
)

App.propTypes = {
  children: PropTypes.node
}

export default App

import React, { PropTypes } from 'react'

import Navbar from './Navbar'

const App = ({
  children
}) => (
  <div>
    <Navbar />
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App

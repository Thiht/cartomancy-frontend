import React from 'react'

import Navbar from './Navbar'

const App = () => (
  <div>
    <Navbar />
    {this.props.children}
  </div>
)

export default App

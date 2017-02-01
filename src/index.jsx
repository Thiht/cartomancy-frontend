import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'

import App from './components/App'

import 'semantic-ui-css/semantic.min.css'

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        {/* <IndexRoute component={Boards} /> */}
        {/* <Route path='boards'>
          <Route path=':boardID' component={Board} />
        </Route> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

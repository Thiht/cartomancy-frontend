import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Redirect, Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'

import App from './components/App'
import Boards from './components/Boards'
import Board from './components/Board'
import { fetchAuthUser } from './actions/auth'

import 'semantic-ui-css/semantic.min.css'
import './common.css'

const history = syncHistoryWithStore(browserHistory, store)

// Retrieve data for the connected user
const jwtToken = localStorage.getItem(`${LOCAL_STORAGE_KEY}-jwt-token`)
if (jwtToken) {
  store.dispatch(fetchAuthUser(jwtToken))
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Boards} />
        <Route path='boards/:boardID' component={Board} />
      </Route>
      <Redirect from="/*" to="/" />
    </Router>
  </Provider>,
  document.getElementById('root')
)

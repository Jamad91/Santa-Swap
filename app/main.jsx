'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import Home from './components/Home'
import Exchanges from './components/Exchange/Exchanges'
import SingleExchange from './components/Exchange/SingleExchange'
import JoinForm from './components/Exchange/JoinForm'
import User from './components/User'

import {fetchUserExchanges, fetchSingleExchange} from './reducers/exchanges'
import {fetchUsers, fetchSingleUser} from 'APP/app/reducers/users'


const onAppEnter = function() {
  store.dispatch(fetchUsers())
  store.dispatch(fetchUserExchanges())
}

const onExchangeEnter = function(nextRouterState) {
  store.dispatch(fetchUsers())
  store.dispatch(fetchSingleExchange(nextRouterState.params.id))
}

const onUserEnter = function(nextRouterState) {
  store.dispatch(fetchSingleUser(nextRouterState.params.id))
}

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} onEnter={onAppEnter}/>
        <Route path="/exchanges/:id" component={SingleExchange} onEnter={onExchangeEnter}/>
        <Route path="/exchanges/:id/join" component={JoinForm} onEnter={onExchangeEnter}/>
        <Route path="/users/:id" component={User} onEnter={onUserEnter} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

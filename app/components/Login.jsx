import React from 'react'

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input placeholder="Email" className="login-field" name="username" /><br />
    <input placeholder="Password" className="login-field" name="password" type="password" /><br />
    <span id="login-button" type="submit" value="Login">Login</span>
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)

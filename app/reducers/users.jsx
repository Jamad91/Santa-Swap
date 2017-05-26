import axios from 'axios'
import store from 'APP/app/store'

import {RECEIVE_USERS} from '../constants'

const DEFAULT_STATE = {
  users: {}
}

export const userReducer = (state = DEFAULT_STATE, action) => {
  let newState = Object.assign({}, state)
  return newState
}

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

export const fetchUsers = function() {
  return dispatch => {
    axios.get('./api/users')
    .then(res => {dispatch(receiveUsers(res.data))})
  }
}

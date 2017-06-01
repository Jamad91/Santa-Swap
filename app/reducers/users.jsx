import axios from 'axios'
import store from 'APP/app/store'

import {RECEIVE_USERS, RECEIVE_SINGLE_USER} from '../constants'

const DEFAULT_STATE = {
  users: [],
  selectedUser: {}
}

export const userReducer = (state = DEFAULT_STATE, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_USERS:
      newState.users = action.users
      break;
    case RECEIVE_SINGLE_USER:
      newState.selectedUser = action.user
      break;
  }
  return newState
}

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

export const fetchUsers = function() {
  return dispatch => {
    axios.get('/api/users')
    .then(res => {dispatch(receiveUsers(res.data))})
  }
}

const receiveUser = user => ({
  type: RECEIVE_SINGLE_USER,
  user
})

export const fetchSingleUser = function(userId) {
  return dispatch => {
    axios.get(`/api/users/${userId}`)
    .then(res => {dispatch(receiveUser(res.data))})
  }
}

import axios from 'axios'
import store from 'APP/app/store'

import {RECEIVE_USERS_EXCHANGES} from '../constants'

const DEFAULT_STATE = {
  exchanges: [],
  selectedExchange: {}
}

export const exchangeReducer = (state = DEFAULT_STATE, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_USERS_EXCHANGES:
      newState.exchanges = action.exchanges
      break
  }
  return newState
}

const receiveUsersExchanges = exchanges => ({
  type: RECEIVE_USERS_EXCHANGES,
  exchanges
})

export const fetchUserExchanges = function() {
  return dispatch => {
    axios.get('./api/exchanges')
    .then(res => {dispatch(receiveUsersExchanges(res.data))})
  }
}

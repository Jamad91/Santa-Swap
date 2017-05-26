import axios from 'axios'
import store from 'APP/app/store'

import {RECEIVE_USERS_EXCHANGES, CREATE_EXCHANGE} from '../constants'

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
    case CREATE_EXCHANGE:
      let dummy = newState.exchanges.slice()
      dummy.push(action.exchangeInfo)
      newState.exchanges = dummy
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

const addExchange = exchangeInfo => ({
  type: CREATE_EXCHANGE,
  exchangeInfo
})

export const createExchange = function(exchangeInfo) {
  return dispatch => {
    dispatch(addExchange(exchangeInfo))
    axios.post('/api/exchanges', exchangeInfo)
      .catch(err => console.error("Wasn't able to create exchange!"))
  }
}

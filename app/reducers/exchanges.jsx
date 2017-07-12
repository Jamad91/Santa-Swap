import axios from 'axios'
import store from 'APP/app/store'

import {RECEIVE_USERS_EXCHANGES, RECEIVE_SINGLE_EXCHANGE, CREATE_EXCHANGE, ADD_PERSON_TO_EXCHANGE} from '../constants'

const DEFAULT_STATE = {
  exchanges: [],
  selectedExchange: {}
}

export const exchangeReducer = (state = DEFAULT_STATE, action) => {
  let newState = Object.assign({}, state)
  let dummy
  switch (action.type) {
    case RECEIVE_USERS_EXCHANGES:
      newState.exchanges = action.exchanges
      break
    case RECEIVE_SINGLE_EXCHANGE:
      newState.selectedExchange = action.exchange
      break
    case CREATE_EXCHANGE:
      dummy = newState.exchanges.slice()
      dummy.push(action.exchangeInfo)
      newState.exchanges = dummy
      break
    case ADD_PERSON_TO_EXCHANGE:
      dummy = newState.selectedExchange
      dummy.members.push(action.personId)
      newState.selectedExchange = dummy
      console.log('action newstate members',newState.selectedExchange.members);
      break
  }
  console.log('newState', newState);
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

const receiveSingleExchange = exchange => ({
  type: RECEIVE_SINGLE_EXCHANGE,
  exchange
})

export const fetchSingleExchange = function(exchangeId) {
  return dispatch => {
    axios.get(`/api/exchanges/${exchangeId}`)
    .then(res => {dispatch(receiveSingleExchange(res.data))})
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

const addUserToExchange = (personId, exchangeId) => ({
  type: ADD_PERSON_TO_EXCHANGE,
  personId,
  exchangeId
})

export const addPersonToExchange = function(personId, exchangeId) {
  console.log('reducer',{personId, exchangeId});

  return dispatch => {
    dispatch(addUserToExchange(personId, exchangeId))
    axios.put(`/api/exchanges/${exchangeId}`)
      // .then(res => res.data)
      .then(exchange => {
        console.log('PRE exchange members',exchange.data.members);
        exchange.data.members.push(personId)
        console.log('POST exchange members',exchange.data.members);
        return exchange
      })
      .catch(err => console.error("Wasn't able to add person to exchange!"))
  }
}

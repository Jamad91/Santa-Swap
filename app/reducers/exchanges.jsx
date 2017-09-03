import axios from 'axios'
import store from 'APP/app/store'

import {RECEIVE_USERS_EXCHANGES, RECEIVE_SINGLE_EXCHANGE, CREATE_EXCHANGE, ADD_PERSON_TO_EXCHANGE, MAKE_LIST} from '../constants'

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
      console.log('action', action.exchangeInfo);
      dummy = newState.selectedExchange
      // if (!dummy.members[0]) {dummy.members = []}
      dummy.members.push(action.exchangeInfo)
      newState.selectedExchange = dummy
      console.log('newState', newState);
      break
    case MAKE_LIST:
      dummy = newState.selectedExchange
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

const receiveSingleExchange = exchange => ({
  type: RECEIVE_SINGLE_EXCHANGE,
  exchange
})

export const fetchSingleExchange = function(exchangeId) {;
  return dispatch => {
    axios.get(`/api/exchanges/${exchangeId}`)
    .then(res => {
      dispatch(receiveSingleExchange(res.data))
    })
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
      .then(exchange => exchange)
      .catch(err => console.error("Wasn't able to create exchange!"))
  }
}

const addUserToExchange = (exchangeId, exchangeInfo) => ({
  type: ADD_PERSON_TO_EXCHANGE,
  exchangeId,
  exchangeInfo
})

export const addPersonToExchange = function(exchangeId, exchangeInfo) {
    console.log('exchangeId', exchangeId);
    console.log('exchangeInfo', exchangeInfo);
    return dispatch => {
      dispatch(addUserToExchange(exchangeId, exchangeInfo))
      return axios.put(`/api/exchanges/${exchangeId}`, exchangeInfo)
        .then(exchange => {
          console.log('add person', exchange);
          return exchange
        })
        .catch(err => console.error("Wasn't able to add person to exchange!"))
  }
}

const addList = (exchangeId, exchangeInfo) => ({
  type: MAKE_LIST,
  exchangeId,
  exchangeInfo
})

export const makeList = function(exchangeId, exchangeInfo) {
  return dispatch => {
    dispatch(addList(exchangeId, exchangeInfo))
    return axios.put(`/api/exchanges/${exchangeId}`, exchangeInfo)
      .then(exchange => exchange)
      .catch(err => console.error("Wasn't able to create list!"))
  }
}

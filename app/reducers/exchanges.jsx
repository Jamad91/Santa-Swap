import axios from 'axios'
import store from 'APP/app/store'

import {
  RECEIVE_USERS_EXCHANGES,
  RECEIVE_SINGLE_EXCHANGE,
  CREATE_EXCHANGE,
  ADD_PERSON_TO_EXCHANGE,
  REMOVE_PERSON_FROM_EXCHANGE,
  MAKE_LIST
} from '../constants'

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
      dummy.members.push(action.exchangeInfo)
      newState.selectedExchange = dummy
      break
    case REMOVE_PERSON_FROM_EXCHANGE:

      dummy = newState.selectedExchange
      let idx;
      for (var i = 0; !idx && i < dummy.members.length; i++) {
        if (action.personId === dummy.members[i].id) {
          idx = i
        }
      }
      dummy.members.splice(idx, 1)
      console.log('dummy', dummy);
      newState.selectedExchange = dummy
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
      .catch(err => console.error("Wasn't able to create exchange!"))
  }
}

const addUserToExchange = (exchangeId, exchangeInfo) => ({
  type: ADD_PERSON_TO_EXCHANGE,
  exchangeId,
  exchangeInfo
})

export const addPersonToExchange = function(exchangeId, exchangeInfo) {
    return dispatch => {
      dispatch(addUserToExchange(exchangeId, exchangeInfo))
      return axios.put(`/api/exchanges/${exchangeId}`, exchangeInfo)
        .catch(err => console.error("Wasn't able to add person to exchange!"))
  }
}

const deleteMember = (exchangeId, personId) => ({
  type: REMOVE_PERSON_FROM_EXCHANGE,
  exchangeId,
  personId
})

export const removeMember = (exchangeId, personId) => {
  console.log('removing', exchangeId, personId);
  return dispatch => {
    dispatch(deleteMember(exchangeId, personId))
    return axios.put(`/api/exchanges/${exchangeId}`, personId)
      .catch(err => console.error("Wasn't able to remove person from exchange!"))
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
      .catch(err => console.error("Wasn't able to create list!"))
  }
}

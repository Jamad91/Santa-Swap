import axios from 'axios'
import store from 'APP/app/store'

import RECEIVE_USERS_EXCHANGES from '../constants'

export const exchangeReducer = (state = [], action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_USERS_EXCHANGES:
      console.log(action);
      newState.exchanges = action.exchanges
      break
  }
  return newState
}

const receive_users_exchanges = exchanges => ({
  type: RECEIVE_USERS_EXCHANGES,
  exchanges
})

export const fetchUserExchanges = () => {
  return dispatch => {
    axios.get('./api/exchanges')
    .then(res => dispatch(receive_users_exchanges(res.data)))
  }
}

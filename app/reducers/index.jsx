import { combineReducers } from 'redux'
import authReducer from './auth'
import {exchangeReducer} from './exchanges'
import {userReducer} from './users'

const rootReducer = combineReducers({
  auth: authReducer,
  exchangeReducer,
  userReducer
})

export default rootReducer

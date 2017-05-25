import { combineReducers } from 'redux'
import authReducer from './auth'
import {exchangeReducer} from './exchanges'

const rootReducer = combineReducers({
  auth: authReducer,
  exchangeReducer
})

export default rootReducer

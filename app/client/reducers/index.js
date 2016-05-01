import { combineReducers } from 'redux'
import app from './app'
import quiz from './quiz'

const rootReducer = combineReducers({
  app,
  quiz
})

export default rootReducer
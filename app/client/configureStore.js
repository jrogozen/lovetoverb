import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

export default function configureStore(initialState) {
  const composedStore = compose(
    applyMiddleware(thunk)
  )(createStore)

  const store = composedStore(rootReducer, initialState)

  return store
}
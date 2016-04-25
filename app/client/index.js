// client side entry point
import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import App from './containers/App'
import rootReducer from './reducers'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = createStore(rootReducer, initialState)

function createElement(Component, props) {
  props = _.assign(props, {
    store
  })
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} createElement={createElement}/>
  </Provider>,
  document.getElementById('root')
)
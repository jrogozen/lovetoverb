import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import FrontPage from './containers/FrontPage'
import QuizPage from './containers/QuizPage'

module.exports = (
  <Route component={App} path="/">
    <IndexRoute component={FrontPage} />
    <Route component={QuizPage} path="/quiz" />
  </Route>
)
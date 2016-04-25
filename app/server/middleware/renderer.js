import _ from 'lodash'
import qs from 'qs'
import React from 'react'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import App from '../../client/containers/App'
import configureStore from '../../client/configureStore'
import routes from '../../client/routes'

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Love To Verb</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src=""></script>
      </body>
    </html>
  `
}



function handleRenderToString(store, renderProps) {
  function createElement(Component, props) {
    props = _.assign(props, {
      store
    })

    return <Component {...props} />
  }

  return renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} createElement={createElement} />
    </Provider>
  )
}

function renderer(req, res, next) {
  const params = qs.parse(req.query)
  let initialState = {}

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = configureStore(initialState)
      const html = handleRenderToString(store, renderProps)
      const finalState = store.getState()

      res.send(renderFullPage(html, finalState))
    } else {
      res.status(404).send('Not found')
    }
  })
}

export default renderer
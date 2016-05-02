import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import api from './api'
import renderer from './middleware/renderer'

require('./db')

// can change this to webpack feature flag
const DEBUG = process.env.NODE_ENV !== 'production'

const server = express()

server.set('env', DEBUG ? 'development' : 'production')
server.set('port', process.env.PORT || 8080)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cookieParser())
server.use(compression())

if (DEBUG) {
  const webpack = require('webpack')
  const webpackConfig = require('../../webpack.config.babel.js')
  const compiler = webpack(webpackConfig)

  server.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    lazy: false,
    stats: {
      colors: true,
      hah: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))

  // server.use(require('webpack-hot-middleware')(compiler, {
  //   log: console.log,
  //   path: '/__webpack_hmr'
  // }))
} else {
  server.use(express.static(path.resolve(__dirname, '../build')))
  server.use(morgan('combined'))
}

server.use('/api', api)
server.use(renderer)

server.listen(server.get('port'), () => {
  console.info(`Server running in ${server.get('env')} on port ${server.get('port')}`)
})
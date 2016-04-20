import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import api from './api'

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

} else {
  server.use(express.static(path.resolve(__dirname, '../build')))
  server.use(morgan('combined'))
}

server.use('/api', api)

server.listen(server.get('port'), () => {
  console.info(`Server running in ${server.get('env')} on port ${server.get('port')}`)
})
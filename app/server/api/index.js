import express from 'express'

import verbs from './verbs'

const router = new express.Router()

verbs(router)

export default router
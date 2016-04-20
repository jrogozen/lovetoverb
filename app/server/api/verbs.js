import _ from 'lodash'

import * as Verbs from '../models/verbs'
import { query } from '../db'

export default function verbs(router) {
  router.post('/verbs', (req, res, next) => {

  })

  router.get('/verbs/:id', (req, res, next) => {
    const { id } = req.params

    query(`SELECT * from verbs WHERE id = ${id}`)
      .then((data) => {
        if (data && !_.isEmpty(data.rows)) {
          const verb = data.rows[0]

          res.send({
            success: true,
            data: verb
          })
        } else {

          // todo: why doesn't this error pass through?
          throw new Errror('No Data Found')
        }
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          error: err
        })
      })
  })
}
import _ from 'lodash'

import * as Verbs from '../models/verbs'
import * as Tenses from '../models/tenses'
import { query } from '../db'

export default function verbs(router) {
  router.post('/verbs', (req, res, next) => {
    // todo: needs authentication logic
    // use seed data for now
  })

  router.get('/verbs', (req, res, next) => {
    let { language, limit } = req.query;
    let languageId;

    limit = limit || 20
    language = language || 'korean'

    query(`SELECT * from languages WHERE name = '${language}'`)
      .then((data) => {
        if (data && !_.isEmpty(data.rows)) {
          languageId = data.rows[0].id;
        } else {
          throw new Error('No matching language found')
        }
      })
      .catch((err) => {
        res.send({
          success: false,
          error: err
        })
      })
      .then(() => {
        query(`SELECT * from verbs WHERE language_id = ${languageId} ORDER BY random() LIMIT ${limit}`)
          .then((data) => {
            if (data && !_.isEmpty(data.rows)) {
              res.send({
                success: true,
                data: data.rows
              })
            } else {
              throw new Error('No matching verbs found')
            }
          })
          .catch((err) => {
            res.send({
              success: false,
              error: err
            })
          })
      })
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
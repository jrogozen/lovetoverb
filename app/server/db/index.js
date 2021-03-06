import _ from 'lodash'
import pg from 'pg'
import chalk from 'chalk'
import Promise from 'promise'

import * as seedData from '../seed.json'

const DEBUG = process.env.NODE_ENV !== 'production' // replace with webpack production flag
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lovetoverb'
const client = new pg.Client(connectionString)

client.connect()

function setup() {
  const promises = [
    query("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public; COMMENT ON SCHEMA public IS 'standard public schema'"),
    query("CREATE TABLE languages(id SERIAL PRIMARY KEY not null, name TEXT not null)"),
    query("CREATE TABLE verbs(id SERIAL PRIMARY KEY not null, language_id INTEGER references languages(id), stem TEXT not null, definition TEXT not null, present TEXT, past TEXT, future TEXT)"),
  ]

  return Promise.all(promises)
    .then(() => console.log(chalk.blue.bold('tables successfully created')))
}

function seed() {
  const promises = [
    query(`INSERT INTO languages(name) values ('korean')`)
  ]

  // todo: investigate why this doesn't trigger Promise.all()
  _.forEach(seedData, (languageSet, language) => {
    languageSet.forEach((word) => {
      console.log('pushing seed data', word);
      promises.push(
        query(`INSERT INTO verbs(language_id, stem, definition, present, past, future) values
          (1, '${word.stem}', '${word.definition}', '${word.present}', '${word.past}', '${word.future}')
        `)
      )
    })
  })

  return Promise.all(promises)
    .then(() => console.log(chalk.blue.bold('data successfully seeded')))
}

// todo: separate db build npm command
if (false && DEBUG) {
  setup().then(() => seed())
}

function query(sql, values) {
  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) {
        console.log(chalk.red.bold('error running SQL!', err))
        reject(err)
      }

      return resolve(result)
    })
  })
}

export { query }
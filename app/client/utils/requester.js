import fetch from 'isomorphic-fetch'

const API_URL = 'http://localhost:8080/api/'

export default function(method, url, options) {
  return fetch(API_URL + url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  })
}
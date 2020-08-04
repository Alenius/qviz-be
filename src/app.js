require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000

const queries = require('./db/queries')
const { request } = require('express')

const startServer = () => {
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
}

startServer()

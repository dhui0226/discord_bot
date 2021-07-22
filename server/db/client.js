const { Client } = require('pg')
const client = new Client('postgres://localhost:5432/coinList')

module.exports = { client }
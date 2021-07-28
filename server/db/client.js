const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/coinList'
const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
})

module.exports = { client }
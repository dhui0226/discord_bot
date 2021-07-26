const { client } = require('./client')

async function addCoin({ coinName }) {
    try {
        const { rows: [ coin ] } = await client.query(`
            INSERT INTO coins(name)
            VALUES ($1)
            RETURNING *;
        `, [coinName])

        return coin
    } catch (error) {
        console.error('could not add coin')
    }
}

async function removeCoin({ coinName }) {
    try {
        const { rows: [ coin ] } = await client.query(`
            DELETE FROM coins
            WHERE name = '${coinName}'
            RETURNING *;
        `)

        return coin
    } catch (error) {
        console.error('could not remove coin')
    }
}

async function getCoinByName(name) {
    try {
        const { rows: [ coin ] } = await client.query(`
            SELECT *
            FROM coins
            WHERE name = '${name}';
        `)

        return coin
    } catch (error) {
        console.error('could not get coin by name')
    }
}

async function getCoinList() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM coins;
        `)

        return rows
    } catch (error) {
        console.error('could not get list')
    }
}

module.exports = {
    addCoin,
    removeCoin,
    getCoinByName,
    getCoinList
}
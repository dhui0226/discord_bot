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

async function getCoinByName(name) {
    const { rows: [ coin ] } = await client.query(`
        SELECT *
        FROM coins
        WHERE name = '${name}';
    `)

    console.log('getCoinByName', coin)
    return coin
}

module.exports = {
    getCoinByName,
    addCoin
}
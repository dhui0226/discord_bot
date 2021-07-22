const { client } = require('./client')

async function dropTable() {
    try {
        client.query(`
            DROP TABLE coins IF EXISTS;
        `)
    } catch (error) {
        console.error('could not drop table')
    }
}

async function createTable() {
    try {
        client.query(`
            CREATE TABLE coins (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL
            );
        `)
    } catch (error) {
        console.error('could not create table')
    }
}

async function addCoin({ coinName }) {
    try {
        await client.query(`
            INSERT INTO coins(name)
            VALUES ($1);
        `, [coinName])
    } catch (error) {
        console.error('could not add coin')
    }
}

async function createInitialCoins() {
    try {
        const coinsToAdd = [
            {coinName: 'bitcoin'},
            {coinName: 'ethereum'},
            {coinName: 'cardano'}
        ]
    
        const coins = Promise.all(coinsToAdd.map(addCoin))
    } catch (error) {
        console.error('could not create initial coins')
    }
}

async function rebuildDB() {
    try {
        client.connect()
        await dropTable()
        await createTable()
        await createInitialCoins()
    } catch (error) {
        console.error('error during rebuildDB')
    }
}

module.exports = { rebuildDB }
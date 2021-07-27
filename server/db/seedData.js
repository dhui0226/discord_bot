const { client } = require('./client')
const { addCoin } = require('./coins')

async function dropTable() {
    try {
        client.query(`
            DROP TABLE IF EXISTS coins;
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

//async function createInitialCoins() {
//    try {
//        const coinsToAdd = [
//            {coinName: 'bitcoin'},
//            {coinName: 'ethereum'},
//            {coinName: 'cardano'}
//        ]
//    
//        const coins = await Promise.all(coinsToAdd.map(addCoin))
//
//        console.log(coins)
//    } catch (error) {
//        console.error('could not create initial coins')
//    }
//}

async function rebuildDB() {
    try {
        console.log('connecting to client')
        client.connect()
        console.log('dropping tables')
        await dropTable()
        console.log('creating tables')
        await createTable()
        //await createInitialCoins()
    } catch (error) {
        console.error('error during rebuildDB')
    }
}

module.exports = { rebuildDB }
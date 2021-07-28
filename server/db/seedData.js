const { client } = require('./client')
const { addCoin } = require('./coins')

async function dropTable() {
    try {
        console.log('dropping table...')

        await client.query(`
            DROP TABLE IF EXISTS coins;
        `)

        console.log('done dropping table')
    } catch (error) {
        console.error('could not drop table')
    }
}

async function createTable() {
    try {
        console.log('creating table...')

        await client.query(`
            CREATE TABLE coins (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL
            );
        `)

        console.log('done creating table')
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
        client.connect()
        await dropTable()
        await createTable()
        //await createInitialCoins()
    } catch (error) {
        console.error('error during rebuildDB')
    }
}

module.exports = { rebuildDB }
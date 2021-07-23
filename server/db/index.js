const { client } = require('./client')
const { addCoin, getCoinByName, getCoinList } = require('./coins')

module.exports = {
    client,
    addCoin,
    getCoinByName,
    getCoinList
}
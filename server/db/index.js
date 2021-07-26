const { client } = require('./client')
const { addCoin, removeCoin, getCoinByName, getCoinList } = require('./coins')

module.exports = {
    client,
    addCoin,
    removeCoin,
    getCoinByName,
    getCoinList
}
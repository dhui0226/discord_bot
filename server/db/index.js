const { client } = require('./client')
const { getCoinByName, addCoin } = require('./coins')

module.exports = {
    client,
    getCoinByName,
    addCoin
}
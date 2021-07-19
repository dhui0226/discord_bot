const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

const checkStatus = async() => {
    const data = await CoinGeckoClient.ping()

    return data
}

const getCoins = async() => {
    const { data } = await CoinGeckoClient.coins.all() 

    return data
}

const getCoin = async() => {
    const { data } = await CoinGeckoClient.coins.fetch('cardano', {})

    return data
}

module.exports = { 
    checkStatus,
    getCoins,
    getCoin
 }
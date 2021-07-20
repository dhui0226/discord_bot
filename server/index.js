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

const getCoin = async(coinId) => {
    console.log('fetch', coinId)
    const { data } = await CoinGeckoClient.coins.fetch(coinId, {})

    return data
}

module.exports = { 
    checkStatus,
    getCoins,
    getCoin
 }
const { getCoin } = require('../server')
const { getCoinList } = require('../server/db')

module.exports = {
    name: 'watchlist',
    description: 'watchList command',
    async execute(message, args) {
        const objectList = await getCoinList()

        const coinNames = objectList.map((ele) => {
            return ele.name
        })

        try {
            const coins = await Promise.all(coinNames.map(getCoin))

            coins.map((coin) => {
                message.channel.send(`${coin.id}: ${coin.market_data.current_price.usd}`)
            })
        } catch (error) {
            message.channel.send('could not display watchlist')
        }
    }
}
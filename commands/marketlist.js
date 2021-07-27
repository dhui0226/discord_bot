const { getCoins } = require('../server')

module.exports = {
    name: 'marketlist',
    description: 'marketlist command',
    async execute(message, args) {
        message.channel.send('Here are the first 50 coins by market rank.')
        const coins = await getCoins()

        coins.map((coin) => {
            message.channel.send(`${coin.market_data.market_cap_rank}: ${coin.id}`)
        })
    }
}
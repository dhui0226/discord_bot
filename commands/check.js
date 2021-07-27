const { execute } = require("./test");

const { getCoin } = require('../server')

module.exports = {
    name: 'check',
    description: 'check command',
    async execute(message, args) {
        const queriedCoin = args[1].toLowerCase()

        try {
            const coin = await getCoin(queriedCoin)
            const name = coin.id 
            const price = coin.market_data.current_price.usd
        
            message.channel.send(`${name}: ${price}`)
        } catch (error) {
            message.channel.send('could not find this coin')
        }
    }
}
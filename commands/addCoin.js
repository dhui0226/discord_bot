const { addCoin, getCoinByName } = require('../server/db')
const { getCoin } = require('../server')

module.exports = {
    name: 'add',
    description: 'add command',
    async execute(message, args) {
        const coinToAdd = args[1].toLowerCase()

        try {
            const listedCoin = await getCoinByName(coinToAdd)
        
            if (listedCoin) {
                message.channel.send('coin is already added to list')
            } else {
                const coin = await getCoin(coinToAdd)
                if (coin.id) {
                    await addCoin({ coinName: coin.id })
                    message.channel.send(`${coin.id} has been added to the list`)
                }
            }
        } catch(error) {
            console.error('could not add coin to the watchlist')
        }
    }
}
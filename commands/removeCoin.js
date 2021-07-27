const { removeCoin, getCoinByName } = require('../server/db')

module.exports = {
    name: 'remove',
    description: 'remove command',
    async execute(message, args) {
        const coinToRemove = args[1].toLowerCase()

            try {
                const listedCoin = await getCoinByName(coinToRemove)

                if (listedCoin) {
                    await removeCoin({coinName: coinToRemove})
                    message.channel.send(`${coinToRemove} has been removed from the list`)
                } else {
                    message.channel.send('coin does not exist on the watchlist')
                }
            } catch (error) {
                console.error('could not remove coin from the watchlist')
            }
    }
}
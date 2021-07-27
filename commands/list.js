const { getCoinList } = require('../server/db')

module.exports = {
    name: 'list',
    description: 'list command',
    async execute(message, args) {
        const list = await getCoinList()

        message.channel.send(`Here are the coins currently on your watchlist.`)
        list.map((coin) => {
            message.channel.send(coin.name)
        })
    }
}
module.exports = {
    name: 'commands',
    description: 'commands command',
    execute(message, args) {
        message.channel.send('Here is a list of tasks I can perform:\n !add-add a coin to your watchlist\n !remove-remove a coin from your watchlist\n !check-check the price of a coin\n !list-display the coins currently on your watchlist\n !watchlist-display the coins on your watchlist along with their current price\n !marketlist-display a list of the top coins on the market')
    }
}


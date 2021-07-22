require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { client: post } = require('./server/db')
const { checkStatus, getCoins, getCoin } = require('./server')
const { getCoinByName } = require('./server/db')
const PREFIX = '!'

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

post.connect()

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general')

    if (!channel) return

    channel.send(`Welcome to ${member.guild.name}, ${member}!\n To look up the price of a cryptocurrency, just type !anyCoinName. For example, !bitcoin.\n Here is a list of 10 coins you might be interested in.`)

    const coins = await getCoins()
        
    coins.map((coin) => {
        if (coin.market_data.market_cap_rank <= 10) {
            channel.send(coin.id)
        }
    })
})

client.on('message', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return

    if (message.content.startsWith(`${PREFIX}ping`)) {
        const startMsg = await checkStatus()
        message.channel.send(startMsg.data.gecko_says)

        client.emit('guildMemberAdd', message.member)
    } else if (message.content.startsWith(`${PREFIX}add`)) {
        const args = message.content.slice(PREFIX.length).trim().split(' ')
        const coinToAdd = args[1]

        const listedCoin = await getCoinByName(coinToAdd)
       
        if (listedCoin.name) {
            message.channel.send('coin is already added to list')
        } else {
            //query coingecko to see if coin exists
            //if exist then add to db
        }
        
    } else if (message.content.startsWith(`${PREFIX}`)) {
        const queriedCoin = message.content.slice(1)

        try {
            const coin = await getCoin(queriedCoin.toLowerCase())
            const name = coin.id 
            const price = coin.market_data.current_price.usd
        
            message.channel.send(`${name}: ${price}`)
        } catch (error) {
            message.channel.send('could not find this coin')
        }
    }
})

client.login(process.env.TOKEN)
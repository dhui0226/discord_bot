require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { checkStatus, getCoins, getCoin } = require('./server')

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('message', async (message) => {
    if (message.author.bot) return
})

client.on('message', async (message) => {
    if (message.author.bot) return

    if (message.content === 'ping') {
        const startMsg = await checkStatus()
        console.log('start', startMsg)
        message.channel.send(startMsg.data.gecko_says)
    } else if (message.content === 'coins') {
        //need to map coin IDs
        const coins = await getCoins()
        console.log('test', coins[0].id)
        message.channel.send(coins[0].id)
    } else {
        const coin = await getCoin(message.content)
        const name = coin.id 
        const price = coin.market_data.current_price.usd
        
        message.channel.send(`${name}: ${price}`)
    }
})

client.login(process.env.TOKEN)
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { checkStatus, getCoins, getCoin } = require('./server')

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('message', async (message) => {
    if (message.content === 'ping') {
        const startMsg = await checkStatus()
        console.log('start', startMsg)
        message.channel.send(startMsg.data.gecko_says)
    } else if (message.content === 'coins') {
        const coins = await getCoins()
        console.log('test', coins.id)
        message.channel.send(coins.id)
    } else if (message.content === 'cardano') {
        const coin = await getCoin()
        const name = coin.id 
        const price = coin.market_data.current_price.usd
        
        message.channel.send(`${name}: ${price}`)
    }
})

client.login(process.env.TOKEN)
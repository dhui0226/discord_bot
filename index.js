require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`)
})

client.on('message', async (message) => {
    if (message.content === 'ping') {
        message.reply('pong')
    }
})

client.login(process.env.TOKEN)
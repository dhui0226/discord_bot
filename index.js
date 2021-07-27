require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { client: post } = require('./server/db')
const { checkStatus, getCoins, getCoin } = require('./server')
const { addCoin, removeCoin, getCoinByName, getCoinList } = require('./server/db')
//const { addCommand } = require('./commands')
const PREFIX = '!'

const fs = require('fs')
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

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

    const args = message.content.slice(PREFIX.length).trim().split(' ')
    const command = args[0].toLowerCase()

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	} 

    /*if (command === 'ping') {
        const startMsg = await checkStatus()
        message.channel.send(startMsg.data.gecko_says)

        client.emit('guildMemberAdd', message.member)
    } else if (command === 'list') {
        const list = await getCoinList()

        message.channel.send(`Here are the coins currently on your watchlist.`)
        list.map((coin) => {
            message.channel.send(coin.name)
        })
    } else if (command === 'marketlist') {
        message.channel.send('Here are the first 50 coins by market rank.')
        const coins = await getCoins()

        coins.map((coin) => {
            message.channel.send(`${coin.market_data.market_cap_rank}: ${coin.id}`)
        })
    } else {
        const queriedCoin = command

        try {
            const coin = await getCoin(queriedCoin)
            const name = coin.id 
            const price = coin.market_data.current_price.usd
        
            message.channel.send(`${name}: ${price}`)
        } catch (error) {
            message.channel.send('could not find this coin')
        }
    } */
})

client.login(process.env.TOKEN)
require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { client: post } = require('./server/db')
const { getCoin, getCoins } = require('./server')
const { getCoinList } = require('./server/db')
const PREFIX = '!'

post.connect()

const fs = require('fs')
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`)

    setInterval( async () => {
        const channel = client.channels.cache.find(ch => ch.name === 'general')
        channel.send('Here is your hourly update')

        const objectList = await getCoinList()
        const coinNames = objectList.map((ele) => {
            return ele.name
        })

        try {
            const coins = await Promise.all(coinNames.map(getCoin))
            coins.map((coin) => {
                channel.send(`${coin.id}: ${coin.market_data.current_price.usd}`)
            })
        } catch (error) {
            channel.send('could not display watchlist')
        }
    }, 3600000)
})

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general')

    if (!channel) return

    channel.send(`Welcome to ${member.guild.name}, ${member}!\n To look up the price of a cryptocurrency, just type !anyCoinName. For example, !bitcoin.\n For a list of tasks I'm able to perform, type !commands\n Here is a list of 10 coins you might be interested in.`)

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

})

client.login(process.env.TOKEN)
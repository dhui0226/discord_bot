require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const { client: post } = require('./server/db')
const { checkStatus, getCoins, getCoin } = require('./server')
const { addCoin, removeCoin, getCoinByName, getCoinList } = require('./server/db')
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

    const args = message.content.slice(PREFIX.length).trim().split(' ')
    const command = args[0].toLowerCase()

    if (command === 'ping') {
        const startMsg = await checkStatus()
        message.channel.send(startMsg.data.gecko_says)

        client.emit('guildMemberAdd', message.member)
    } else if (command === 'add') {
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
            console.error('something went wrong')
        }
    } else if (command === 'remove') {
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
    } else if (command === 'list') {
        const list = await getCoinList()

        message.channel.send(`Here are the coins currently on your watchlist.`)
        list.map((coin) => {
            message.channel.send(coin.name)
        })
    } else if (command === 'watchlist') {
        const objectList = await getCoinList()

        const coinNames = objectList.map((ele) => {
            return ele.name
        })

        try {
            const coins = await Promise.all(coinNames.map(getCoin))

            coins.map((coin) => {
                message.channel.send(`${coin.id}: ${coin.market_data.current_price.usd}`)
            })
        } catch (error) {
            message.channel.send('could not display watchlist')
        }
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
    }
})

client.login(process.env.TOKEN)
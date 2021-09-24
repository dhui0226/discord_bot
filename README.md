# Discord Bot

A bot for getting live updates of cryptocurrencies while interacting with friends on Discord. Currently does not support tokens.

## Get Started

Create a discord account.  
Follow the [documentation](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to set up your bot and invite it to your desired server.  
Create a ``` .env ``` file at the root of the project and create the variable ``` TOKEN = '[YOUR_BOT_TOKEN]' ```  
Install dependencies with ``` npm install ```
Seed the database with ``` npm run seed ```  
Start up the bot with ``` npm start ```

## Discord Commands

Command | Example | Description
------- | ------- | -----------
!add \[coin name\] | !add bitcoin | add a crytocurrency to your watchlist
!remove \[coin name\] | !remove bitcoin | remove a cryptocurrency from your watchlist
!check \[coin name\] | !check bitcoin | check the price of the mentioned cryptocurrency
!list | !list | get the names of the cryptocurrencies on your watchlist
!watchlist | !watchlist | get the live prices of the cryptocurrencies on your watchlist
!marketlist | !marketlist | get a list of the top 50 cryptocurrencies and their prices
!commands | !commands | get a list of commands that the bot is able to perform

## Links

[discord.js documentation](https://discordjs.guide/#before-you-begin)  
[CoinGecko API Node.js wrapper documentation](https://github.com/miscavage/CoinGecko-API)
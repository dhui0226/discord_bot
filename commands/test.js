const { checkStatus } = require('../server')

module.exports = {
    name: 'test',
    description: 'test command',
    async execute(message, args) {
        const startMsg = await checkStatus()
        message.channel.send(startMsg.data.gecko_says)

        //client.emit('guildMemberAdd', message.member)
    }
}
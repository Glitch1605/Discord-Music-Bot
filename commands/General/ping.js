module.exports = {
    name: "ping",
    category: "General",
    aliases: [],
    description: "Get The Bot's Ping",
    usage: "{prefix}ping",
    async execute(client, message) {
        return message.channel.send(`**Pong! ${client.ws.ping}**`);
    }
}
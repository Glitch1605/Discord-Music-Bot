const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "queueEnd",
    async execute (client, player) {
        const embed = new MessageEmbed()
        .setDescription(`**Music Stopped As There Is No More Music In The Queue**`)
        .setColor(`${client.config.embedcolor}`)

        client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
    }
}
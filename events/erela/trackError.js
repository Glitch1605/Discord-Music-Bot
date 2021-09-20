const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "trackError",
    async execute (client, player, track, payload) {
        const embed = new MessageEmbed()
        .setTitle(`The Track Got An Error`)
        .setColor(`${client.config.embedcolor}`)
        .setDescription(`${client.config.emojis.error} **I Skipped The Track As It Got An Error**`)

        player.stop();
        client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
    }
}
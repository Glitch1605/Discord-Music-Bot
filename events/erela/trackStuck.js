const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "trackStuck",
    async execute (client, player, track, payload) {
        const embed = new MessageEmbed()
        .setTitle(`The Track Got Stuck`)
        .setColor(`${client.config.embedcolor}`)
        .setDescription(`${client.config.emojis.error} **I Skipped The Track As It Stucked**`)

        player.stop();
        client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
    }
}
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "trackStart",
    async execute (client, player, track) {
        const embed = new MessageEmbed()
        .setAuthor(`NOW PLAYING`)
        .setColor(`${client.config.embedcolor}`)
        .setDescription(`[\`${track.title}\`](${track.uri})\nRequested By: <@${track.requester.id}> | Duration: \`${format(track.duration)}\``)

        client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
    }
}

function format(millis) {
    const h = Math.floor(millis / 3600000)
    const m = Math.floor(millis / 60000)
    const s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
}
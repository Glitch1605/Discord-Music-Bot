const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "playerMove",
    async execute (client, player, oldChannel, newChannel) {
        if (!newChannel) {
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**My Queue Is Cleared As I Have Been Disconnected From The Voice Channel**`)

            client.channels.cache.get(player.textChannel).send({ embeds: [embed] })
            player.destroy();
        }
        
        if (newChannel) {
            player.voiceChannel = newChannel;
            if (player.paused) return;
            setTimeout(() => {
                player.pause(true);
                setTimeout(() => player.pause(false), client.ws.ping * 2);
            }, client.ws.ping * 2);
        }
    }
}
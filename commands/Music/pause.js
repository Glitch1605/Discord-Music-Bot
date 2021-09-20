const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    aliases: [],
    description: "Pause The Current Playing Song",
    usage: "{prefix}pause",
    async execute(client, message) {
        try {
            const player = client.manager.players.get(message.guild.id);

            if (!message.member.voice.channel) {
                const error = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**You Need To Be In A Voice Channel To Use This Command**`)

                return message.channel.send({ embeds: [error] });
            }

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
                const error2 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**You Need To Be In The Same Voice Channel In Which I Am To Use This Command**`)

                return message.channel.send({ embeds: [error2] });
            }

            if (!player) {
                const error3 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**There Is Nothing Playing In This Server**`)

                return message.channel.send({ embeds: [error3] });
            }

            if (player) {
                if (!player.paused) {
                    player.pause(true)
                    const embed = new MessageEmbed()
                    .setColor(`${client.config.embedcolor}`)
                    .setDescription(`**I \`Paused\` The Current Playing Track**`)

                    return message.channel.send({ embeds: [embed] });
                } else {
                    const error4 = new MessageEmbed()
                    .setColor(`${client.config.embedcolor}`)
                    .setDescription(`**The Track Is Already Paused**`)

                    return message.channel.send({ embeds: [error4] });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}
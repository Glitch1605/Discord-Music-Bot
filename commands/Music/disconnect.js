const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "disconnect",
    aliases: ["dc", "leave"],
    category: "Music",
    description: "Disconnect The Bot From Your Voice Channel",
    usage: "{prefix}disconnect",
    async execute (client, message) {
        try {
            const player = client.manager.players.get(message.guild.id);

            if (!message.member.voice.channel) {
                const error = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**You Need To Be In A Voice Channel To Use This Command**`)

                return message.channel.send({ embeds: [error] });
            }

            if (!message.guild.me.voice.channel) {
                const error2 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**I Am Not In A Voice Channel**`)

                return message.channel.send({ embeds: [error2] });
            }

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
                const error3 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**You Need To Be In The Same Voice Channel In Which I Am To Use This Command**`)

                return message.channel.send({ embeds: [error3] });
            }

            if (!player) return;

            player.destroy();
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**I Have embed Your Voice Channel**`)

            return message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}
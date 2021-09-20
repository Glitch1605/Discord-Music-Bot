const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unshuffle",
    aliases: ["ushuffle", "us"],
    category: "Music",
    description: "Unshuffles The Shuffled Queue",
    usage: "{prefix]unshuffle",
    async execute (client, message) {
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

            if (!player.get(`beforeshuffle`)) {
                const error4 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**The Queue Is Not Shuffled**`)

                return message.channel.send({ embeds: [error4] });
            }

            player.queue.clear();
            for (const track of player.get(`beforeshuffle`)) {
                player.queue.add(track);
            }
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**I Unshuffled The Queue For This Server**`)

            message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    aliases: [],
    category: "Music",
    description: "Shuffles The Queue",
    usage: "{prefix}shuffle",
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

            if (player) {
                player.set(`beforeshuffle`, player.queue.map(track => track));
                player.queue.shuffle();
                const embed = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**I Have Shuffled The Queue For This Server**`)
    
                message.channel.send({ embeds: [embed] });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
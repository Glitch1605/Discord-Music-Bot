const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    aliases: ["skto", "skip-to", "jump"],
    category: "Music",
    description: "Skips All The Songs From The Current Playing Track To The Provided Track Number From The Queue",
    usage: "{prefix}skipto <Track number from the queue>",
    async execute (client, message, args) {
        try {
            const player = client.manager.players.get(message.guild.id)

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

            if (!args[0]) {
                const error4 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**Please Provide A Number Till Where You Want To Skip The Queue**`)

                return message.channel.send({ embeds: [error4] });
            }

            if (isNaN(args[0])) {
                const error5 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**The Argument Has To Be A Number**`)

                return message.channel.send({ embeds: [error5] });
            }

            if (Number(args[0]) > player.queue.size) {
                const error6 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**The Track Number Till Where The Queue Is To Be Skipped To Should Be From The Queue**`)

                return message.channel.send({ embeds: [error6] });
            }

            player.queue.remove(0, Number(args[0]) - 1);
            player.stop();
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**Skipped The Queue To Destination**`)

            message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["v"],
    category: "Music",
    description: "Set The Volume Of The Track",
    usage: "{prefix}volume <1-100>",
    async execute (client, message, args) {
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

            if (!args[0]) {
                const error4 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**Please Provide A Number Between 0-100 To Set The Volume**`)

                return message.channel.send({ embeds: [error4] });
            }

            if (isNaN(args[0])) {
                const error5 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**The Argument Should Be A Number To Set The Volume**`)

                return message.channel.send({ embeds: [error5] });
            }

            if (Number(args[0]) <= 0 || Number(args[0]) > 100) {
                const error6 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**I Am Already In A Different Voice Channel Disconnect Me From That Do Use This Command**`)

                return message.channel.send({ embeds: [error6] });
            }

            player.setVolume(parseInt(args[0]));
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**I Have Set The Volume To ${parseInt(args[0])}**`)

            message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}
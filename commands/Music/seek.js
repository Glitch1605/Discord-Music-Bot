const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "seek",
    aliases: [],
    category: "Music",
    description: "Seeks the Song To Your Provided Duration",
    usage: "{prefix}seek <duration>",
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
                .setDescription(`**Please Provide A Duration To Seek From The Current Track**`)

                return message.channel.send({ embeds: [error4] });
            }

            if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000) {
                const error5 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**You May Seek From \`0\` - \`${player.queue.current.duration}\`**`)

                return message.channel.send({ embeds: [error5] });
            }

            if (player) {
                player.seek(Number(args[0]) * 1000);
                const embed = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**Seeked To Song Duration To ${format(Number(args[0]) * 1000)}**`)

                message.channel.send({ embeds: [embed] });
            }
        } catch (e) {
            console.log(e);
        } 
    }
}

function format(millis) {
    const h = Math.floor(millis / 3600000)
    const m = Math.floor(millis / 60000)
    const s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
}
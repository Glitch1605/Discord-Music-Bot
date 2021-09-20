const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "looptrack",
    category: "Music",
    aliases: ["lt", "loopt", "tloop", "trackloop"],
    description: "Loop The Current Playing Track",
    usage: "{prefix}looptrack <on/off>",
    async execute(client, message, args) {
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
                .setDescription(`**Please Provide Whether To Turn On/Off**`)

                return message.channel.send({ embeds: [error4] });
            }
            
            if (args[0]) {
                if (args[0].toLowerCase() === `on`) {
                    if (player.trackRepeat) {
                        const error5 = new MessageEmbed()
                        .setColor(`${client.config.embedcolor}`)
                        .setDescription(`**Track Loop Is Already On**`)

                        return message.channel.send({ embeds: [error5] });
                    } else {
                        player.setTrackRepeat(true)
                        const embed = new MessageEmbed()
                        .setColor(`${client.config.embedcolor}`)
                        .setDescription(`**Track Loop Is Now \`Enabled\` For This Server**`)

                        message.channel.send({ embeds: [embed] });
                    }
                } else if (args[0].toLowerCase() === `off`) {
                    if (!player.trackRepeat) {
                        const error6 = new MessageEmbed()
                        .setColor(`${client.config.embedcolor}`)
                        .setDescription(`**Track Loop Is Already Off**`)

                        return message.channel.send({ embeds: [error6] });
                    } else {
                        player.setTrackRepeat(false)
                        const embed2 = new MessageEmbed()
                        .setColor(`${client.config.embedcolor}`)
                        .setDescription(`**Track Loop Is Now \`Disabled\` For This Server**`)

                        message.channel.send({ embeds: [embed2] });
                    }
                } else {
                    const error7 = new MessageEmbed()
                    .setColor(`${client.config.embedcolor}`)
                    .setDescription(`**Please Provide Whether To Turn On/Off**`)

                    return message.channel.send({ embeds: [error7] });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}
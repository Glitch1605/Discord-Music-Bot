const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    category: "General",
    description: "Set The Prefix Of The Bot",
    usage: "{prefix}setprefix <prefix>",
    async execute (client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const error = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**You Need To \`ADMINISTRATOR\` Permission To Change The Prefix Of The Bot**`)

            return message.channel.send({ embeds: [error] });
        }

        if (!args[0]) {
            const error2 = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**Please Provide Something To Set Prefix**`)

            return message.channel.send({ embeds: [error2] });
        }

        if (args[1]) {
            const error3 = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**You cannot Set The Prefix In Double Arguments**`)

            return message.channel.send({ embeds: [error3] });
        }

        if (args[0].length > 3) {
            const error4 = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**You Cannot Set The Prefix More Than 3 Characters**`)

            return message.channel.send({ embeds: [error4] });
        }

        if(args[0]) {
            try {
                if (args.join("") === client.config.prefix) {
                    await client.db.delete(`prefix_${message.guild.id}`)
                    const embed = new MessageEmbed()
                    .setColor(`${client.config.embedcolor}`)
                    .setDescription(`**Reseted The Prefix To ${client.config.prefix}**`)

                    return message.channel.send({ embeds: [embed] });
                } else {
                    await client.db.set(`prefix_${message.guild.id}`, args[0])
                    const embed2 = new MessageEmbed()
                    .setColor(`${client.config.embedcolor}`)
                    .setDescription(`**The Bot Prefix Is Set To \`${args[0]}\`**`)

                    return message.channel.send({ embeds: [embed2] });
                }
            } catch (e) {
                console.log(e)
            }
        };
    }
};
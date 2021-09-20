const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: ['General'],
    description: "Get The List Of All Commands Of The Bot",
    usage: '{prefix}help <command name>',
    async execute(client, message, args) {
        let prefix = await client.db.fetch(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = client.config.prefix;

        if (!args[0]) {
            const general = client.commands.filter(x => x.category == 'General').map((x) => '`' + x.name + '`').join(', ');
            const music = client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setAuthor(`Commands List of ${client.user.username}`, `${client.user.avatarURL()}`)
            .setDescription(`**To get info of each command you can do ${prefix}help [command]**`)
            .addField('🔰 **General Commands**', general)
            .addField('🎶 **Music Commands**', music)
            .setFooter("Made by [Glitch1605](https://github.com/Glitch1605/Discord-Muisc-Bot)")

            return message.channel.send({ embeds: [embed] });
        } else {

            const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) {
                const error = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**I Didn't Find That Command**`)
                
                message.channel.send({ embeds: [error] });
            }

            if (command) {
                const help2 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setAuthor("Help Panel", `${client.user.avatarURL()}`)
                .addField("Name", command.name, true)
                .addField("Category", command.category, true)
                .addField("Aliases", command.aliases.length < 1 ? 'None' : command.aliases.join(', '), true)
                .addField("Usage", `\`${command.usage.replace('{prefix}', prefix)}\``, true)
                .addField("Description", command.description)

                return message.channel.send({ embeds: [help2] });
            }
        };
    }
};
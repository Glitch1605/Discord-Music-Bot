const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "connect",
    aliases: ["j", "join"],
    category: "Music",
    description: "The Bot Joins Your Voice Channel",
    usage: "{prefix}connect",
    async execute (client, message) {
        try {
            let player = client.manager.players.get(message.guild.id)

            if (!message.member.voice.channel) {
                const error = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**You Need To Be In A Voice Channel To Use This Command**`)

                return message.channel.send({ embeds: [error] });
            }

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
                const error2 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**I Am Already In A Different Voice Channel Disconnect Me From That Do Use This Command**`)

                return message.channel.send({ embeds: [error2] });
            }

            if (message.guild.me.voice.channel && message.member.voice.channel.id == message.guild.me.voice.channel.id) {
                const error3 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**I Am Already In Your Voice Channel**`)

                return message.channel.send({ embeds: [error3] });
            }

            if (!player) {
                player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    selfDeafen: true
                });
                player.connect();
            }

            if (player.state !== "CONNECTED") player.connect();

            setTimeout(async () => {
                if (message.member.voice.channel.type === "GUILD_STAGE_VOICE") {
                    if (message.member.voice.channel.permissionsFor(message.guild.me).has(Permissions.STAGE_MODERATOR)) {
                        await message.guild.me.voice.setSuppressed(false);
                    } else {
                        return message.channel.send('**I Dont Have Permission To Become Speaker, Please Invite me to become speaker**')
                    }
                }
            }, client.ws.ping)
            
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**I Have Joined Your Voice Channel**`)

            message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    }
}
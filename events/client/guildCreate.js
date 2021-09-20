const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildCreate",
    async execute (client, guild) {
        let channel = guild.channels.cache.find(channel => channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES"));

        const embed1 = new MessageEmbed()
        .setColor(`${client.config.embedcolor}`)
        .setTitle(`Thanks For Adding Me ❤`)
        .setThumbnail(`${client.user.avatarURL()}`)
        .setDescription(`My default prefix is \`${client.config.prefix}\`\nYou Can Change The Prefix By Typing \`${client.config.prefix}setprefix <new prefix>\`
        
        You can play music by joining a voice channel and typing\n\`${client.config.prefix}play\`. Type \`${client.config.prefix}help\` To Get All Commands Help Menu.
        
        If you need more help you can join our [Support Server](https://discord.gg/EzDnZSPRxf)`)
        .setTimestamp()
        .setFooter('Thanks For Choosing Vocal Music', client.user.avatarURL())

        channel.send({ embeds: [embed1] });
    }
}
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stats",
    aliases: ["botinfo", "about"],
    category: "General",
    description: "Get The Statistics Of The Bot",
    usage: "{prefix}stats",
    async execute (client, message) {
        try {
            let arr = [];
            client.guilds.cache.forEach(guild => arr.push(guild.memberCount))
            let sum = arr.reduce((a, b) => {
                return a + b
            })

            let days = Math.floor(client.uptime / 86400000 );
            let hours = Math.floor(client.uptime / 3600000 ) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            let seconds = Math.floor(client.uptime / 1000) % 60;
            const uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`\`\``;
            const servers = client.guilds.cache.size
            const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)

            const embed = new MessageEmbed()
            .setTitle(`${client.user.username} Stats`)
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=3435585`)
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`Hey My Name is **${client.user.username}** and My Work is to play Music`)
            .setAuthor(`${client.user.username}`, `${client.user.avatarURL()}`)
            .addField(`Servers:`, `\`\`\`${servers}\`\`\``, true)
            .addField(`Users:`, `\`\`\`${sum}\`\`\``, true)
            .addField(`Uptime:`, `${uptime}`)
            .addField(`Ram:`, `\`\`\`${ram}MB\`\`\``)
            .addField(`Bot's Developer:`, `Glitch#8393`)

            return message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        } 
    }
}
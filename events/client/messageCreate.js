const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "messageCreate",
    async execute (client, message) {
        if (message.author.bot || message.channel.type === "DM") return;
        if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

        let prefix = await client.db.fetch(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = client.config.prefix;

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

        if (!prefixRegex.test(message.content)) return;

        const [, matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        if (cmd) {
            try {
                cmd.execute(client, message, args);
            } catch (e) {
                console.log(e)
                return message.channel.send("There was an error running the command.")
            }
        }

        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setTitle(`About ${client.user.username}`)
            .setThumbnail(client.user.avatarURL())
            .setDescription(`My Prefix Here Is: \`${prefix}\`\nMy Devloper: **Glitch#8393**\n\nYou can play music by joining a voice channel and typing\n\`${prefix}play\`. Type \`${prefix}help\` To Get All Commands Help Menu.\n\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support](https://discord.gg/EzDnZSPRxf)`)
            .setTimestamp();
            return message.channel.send({ embeds: [embed] });
        }
    }
}
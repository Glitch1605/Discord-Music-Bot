const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "play",
    aliases: ['p'],
    category: "Music",
    description: "Play Any Song From Youtube/Spotify/SoundCloud Or Any Other Source",
    usage: "{prefix}play <song name/url>",
    async execute(client, message, args) {
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
                .setDescription(`**You Need To Be In The Same Voice Channel In Which I Am To Use This Command**`)

                return message.channel.send({ embeds: [error2] });
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

            const channel = message.member.voice.channel;
            const res = await client.manager.search(args.join(" "), message.author);
            const track = res.tracks[0]

            player.queue.add(track);
            const embed = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**Added Track \`${track.title}\` To The Queue**`)

            message.channel.send({ embeds: [embed] });

            if (!player.playing && !player.paused && !player.queue.size) player.play();

            setTimeout(async () => {
                if (channel.type === "GUILD_STAGE_VOICE") {
                    if (message.member.voice.channel.permissionsFor(message.guild.me).has(Permissions.STAGE_MODERATOR)) {
                        await message.guild.me.voice.setSuppressed(false);
                    } else {
                        return message.channel.send('**I Dont Have Permission To Become Speaker, Please Invite me to become speaker**')
                    }
                }
            }, client.ws.ping)
        } catch (e) {
            console.log(e);
        }
    }
}
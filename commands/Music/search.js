const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "search",
    category: "Music",
    aliases: ["se"],
    description: "Search And Play A Specified Song",
    usage: "{prefix}search <song name>",
    async execute(client, message, args) {
        try {
            let player = client.manager.players.get(message.guild.id);

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
                player.stop();
            }

            const channel = message.member.voice.channel;
            const search = args.join(" ");
            const results = await client.manager.search(search, message.author);
            const tracks = results.tracks.slice(0, 10);
            let resultsDescription = "";
            let counter = 1;

            for (const track of tracks) {
                resultsDescription += `**#${counter}** **[${track.title}](${track.uri})** **|** **${track.author}**\n`;
                counter++;
            }

            const embed = new MessageEmbed()
            .setDescription(resultsDescription)
            .setColor(`${client.config.embedcolor}`)
            message.channel.send({ content: "**What would you like to choose? Enter Number**", embeds: [embed] });

            const filter = (msg) => msg.author.id === message.author.id
            const response = await message.channel.awaitMessages({ filter, max: 1, time: 30000});

            const answer = response.first().content;
            const track = tracks[answer - 1];

            player.queue.add(track);
            setTimeout(async () => {
                if (channel.type === "GUILD_STAGE_VOICE") {
                    if (message.member.voice.channel.permissionsFor(message.guild.me).has(Permissions.STAGE_MODERATOR)) {
                        await message.guild.me.voice.setSuppressed(false);
                    } else {
                        return message.channel.send('**I Dont Have Permission To Become Speaker, Please Invite me to become speaker**')
                    }
                }
            }, client.ws.ping)

            const trackadded = new MessageEmbed()
            .setColor(`${client.config.embedcolor}`)
            .setDescription(`**Added Track \`${track.title}\` To The Queue**`)

            message.channel.send({ embeds: [trackadded] });

            if (!player.playing && !player.paused && !player.queue.size) player.play();
        } catch (e) {
            console.log(e);
        }
    }
}
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "queue",
    aliases: ["vq", "viewqueue"],
    category: "Music",
    description: "Get The List of Tracks In The Queue",
    usage: "{prefix}queue",
    async execute (client, message) {
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

            if (!player || player.queue.size === 0 && !player.queue.current) {
                const error3 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**There Is Nothing Playing In This Server**`)

                return message.channel.send({ embeds: [error3] });
            }
            
            if(player.queue.size === 0 && player.queue.current) {
                const embed = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**Current Track** -\n**[${player.queue.current.title}](${player.queue.current.uri})** **|** **${player.queue.current.author}**`)
                message.channel.send({ embeds: [embed] })
            } else if (player.queue.size > 0) {
                let currentPage = 0;
                const embeds = pagination(client, message, player.queue);
                const queueEmbed = await message.channel.send({ content: `**Current Page: ${currentPage+1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                if (player.queue.size > 10) {
                    await queueEmbed.react('⬅️');
                    await queueEmbed.react('➡️');
                    await queueEmbed.react('⏹');

                    const filter = (reaction, user) => ['⬅️', '➡️', '⏹'].includes(reaction.emoji.name) && (message.author.id === user.id);
                    const collector = queueEmbed.createReactionCollector(filter);

                    collector.on("collect", async (reaction, user) => {
                        if (reaction.emoji.name === '➡️') {
                            if (currentPage < embeds.length - 1) {
                                currentPage++;
                                queueEmbed.edit({ content: `**Current Page: ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                            }
                        } else if (reaction.emoji.name === '⬅️') {
                            if (currentPage !== 0) {
                                --currentPage;
                                queueEmbed.edit({ content: `**Current Page: ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                            }
                        } else if (reaction.emoji.name === '⏹') {
                            collector.stop();
                            await queueEmbed.delete();
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

function pagination(client, message, queue) {
    const embeds = [];
    let k = 10;
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map(track => `**#${++j}** **[${track.title}](${track.uri})** **|** **${track.author}**`).join("\n")
        const embed = new MessageEmbed()
        .setAuthor(`Queue for ${message.guild.name}  -  [ ${queue.length} Tracks ]`, `${message.guild.iconURL()}`)
        .setColor(`${client.config.embedcolor}`)
        .setDescription(`**Current Track** -\n**[${queue.current.title}](${queue.current.uri})** **|** **${queue.current.author}**\n\n${info}`)
        embeds.push(embed);
    }

    return embeds;
}
const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder")

module.exports = {
    name: "lyrics",
    category: "Music",
    aliases: ["ly"],
    description: "Get The Lyrics of Specified or Current Playing Song",
    usage: "{prefix}lyrics <song name/url>",
    async execute(client, message, args) {
        try {
            const player = client.manager.players.get(message.guild.id);

            if (!args[0] && !player) {
                const error = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**There Is Nothing Playing In This Server**`)

                return message.channel.send({ embeds: [error] });
            }

            let search = player.queue.current.title;
            if (args[0]) search = args.join(" ");

            let lyrics = await lyricsFinder(search);

            if (!lyrics) {
                const error2 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**No Lyrics Found For The ${search}**`)

                return message.channel.send({ embeds: [error2] });
            }

            return swap_pages(client, message, lyrics);
        } catch (e) {
            console.log(e);
        }
    }
}

async function swap_pages(client, message, description) {
    let currentPage = 0;
    let embeds = [];

    if(Array.isArray(description)) {
        try {
            let k = 15;
            for(let i = 0; i < description.length; i += 15) {
                const current = description.slice(i, k);
                k += 15;
                const embed = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`\`\`\`${current}\`\`\``)

                embeds.push(embed);
            }

            embeds;
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            let k = 2000;
            for (let i = 0; i < description.length; i += 1500) {
                const current = description.slice(i, k);
                k += 2000;
                const embed = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`\`\`\`${current}\`\`\``)

                embeds.push(embed);
            }

            embeds;
        } catch (e) {
            console.log(e);
        }
    }

    if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] })
    const queueEmbed = await message.channel.send({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });

    let reactionemojis = ["⬅️", "⏹", "➡️"];

    try {
        for(const emoji of reactionemojis) await queueEmbed.react(emoji)
    } catch (e) {
        console.log(e);
    }

    const filter = (reaction, user) => (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 45000 });

    collector.on("collect", async (reaction, user) => {
        try {
            if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
                if (currentPage < embeds.length - 1) {
                    currentPage++;
                    queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                } else {
                    currentPage = 0
                    queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                }
            } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
                if (currentPage !== 0) {
                    --currentPage;
                    queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                } else {
                    currentPage = embeds.length - 1
                    queueEmbed.edit({ content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds: [embeds[currentPage]] });
                }
            } else {
                collector.stop();
                reaction.message.reactions.removeAll();
            }

            await reaction.users.remove(message.author.id);
        } catch (e) {
            console.log(e);
        }
    });
};
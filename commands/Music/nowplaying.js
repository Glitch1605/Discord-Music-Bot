const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "songinfo"],
    category: "Music",
    description: "Get The Deatils Of The Current Playing Song",
    usage: "{prefix}nowplaying",
    async execute (client, message) {
        try {
            const player = client.manager.players.get(message.guild.id)

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
                const error3 = new MessageEmbed()
                .setColor(`${client.config.embedcolor}`)
                .setDescription(`**There Is Nothing Playing In This Server**`)

                return message.channel.send({ embeds: [error3] });
            }

            const track = player.queue.current;

            const embed = new MessageEmbed()
            .setTitle(track.title)
            .setColor(`${client.config.embedcolor}`)
            .addField(`Channel`, `${track.author}`, true)
            .addField(`Requested By`, `${track.requester.tag}`, true)
            .addField(`Volume`, `${player.volume}`, true)
            .addField(`Duration`, `${format(track.duration)}`, true)
            .addField(`Queue Repeat`, `${player.queueRepeat ? "Yes" : "No"}`, true)
            .addField(`Track Repeat`, `${player.trackRepeat ? "Yes" : "No"}`, true)
            .addField(`Currently Paused`, `${player.paused ? "Yes" : "No"}`, true)
            .addField(`Queue Length`, `${player.queue.length}`, true)
            .addField(`Progress`, `${createBar(player)}`)

            return message.channel.send({ embeds: [embed ] });
        } catch (e) {
            console.log(e);
        }
    }
}

function format(millis) {
    const h = Math.floor(millis / 3600000)
    const m = Math.floor(millis / 60000)
    const s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
}

function createBar(player) {
    try {
        if (!player.queue.current) return `00:00:00 **| 🔘${line.repeat(size - 1)} |** 00:00:00`;
        let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
        let total = player.queue.current.duration;
        let size = 20;
        let line = "▬";
        let slider = "🔘";
        let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar[0]).includes("🔘")) return `00:00:00 **| 🔘${line.repeat(size - 1)} |** 00:00:00`;
        return `${new Date(player.position).toISOString().substr(11, 8)} **| ${bar[0]} |** ${(player.queue.current.duration==0 ? "◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))}`;
    } catch (e) {
        console.log(e)
    }
}
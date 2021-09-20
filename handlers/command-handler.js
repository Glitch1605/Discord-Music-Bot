const fs = require("fs");
const { Collection } = require("discord.js");

module.exports = (client) => {
    client.commands = new Collection();

    fs.readdirSync('./commands').forEach(dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const command = require(`../commands/${dirs}/${file}`);
            client.commands.set(command.name.toLowerCase(), command);
        }

        console.log(`Loaded ${commands.length} Commands!`);
    });
}
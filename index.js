const verification = require("./verifyConfig")();
const { Client } = require('discord.js');
const { Database } = require("quickmongo");

if (verification) {
    const client = new Client({
        presence: {
            status: 'idle',
            activities: [{
                "name": "@Vocal",
                "type": "LISTENING"
            }]
        },
        intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]
    });

    client.config = require('./config.js');
    client.db = new Database(client.config.mongodbURL, "prefixes")

    client.db.on("ready", () => console.log("Connected to Database!"));

    ["command-handler", "erela-handler", "event-handler"].forEach(handler => {
        require(`./handlers/${handler}`)(client);
    });

    client.login(client.config.token);
} else if (!verification) {
    console.log("Caught Error's While Verification Please Fix Them Then Start The Bot...");
    process.exit();
}
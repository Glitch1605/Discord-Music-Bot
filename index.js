const { verification } = require("./verifyConfig");
const { Client } = require('discord.js');
const { Database } = require("quickmongo");
const { join } = require("path");
const { readdirSync } = require("fs");

if (!verification()) throw new TypeError("Caught Error's While Verification Please Fix Them Then Start The Bot...");

const client = new Client({
    intents: 1665,
    presence: {
        status: 'idle',
        activities: [{
            "name": "@Vocal",
            "type": "LISTENING"
        }]
    }
});

client.config = require('./config.js');
client.db = new Database(client.config.mongodbURL, "prefixes")

client.db.on("ready", () => console.log("Connected to Database!"));

const folder = readdirSync(join(__dirname, "./handlers"))
for (const file of folder) {
    require(`./handlers/${file}`)(client)
};

client.login(client.config.token);
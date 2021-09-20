const { Manager } = require('erela.js')
const fs = require('fs');
const Spotify = require('erela.js-spotify');
const Deezer = require('erela.js-deezer');

module.exports = (client) => {
    client.manager = new Manager({
        nodes: [
            {
                host: client.config.lavalink.host,
                port: client.config.lavalink.port,
                password: client.config.lavalink.password
            },
        ],

        plugins: [
            new Spotify({
                clientID: client.config.clientId,
                clientSecret: client.config.clientSecret
            }),
            new Deezer()
        ],

        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    });

    const events = fs.readdirSync('./events/erela').filter(file => file.endsWith('.js'));

    for (const file of events) {
        const event = require(`../events/erela/${file}`);
        client.manager.on(event.name, (...args) => event.execute(client, ...args));
    }

    console.log(`Loaded ${events.length} EJS Events!`);
};
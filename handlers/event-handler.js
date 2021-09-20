const fs = require("fs");

module.exports = (client) => {
    const events = fs.readdirSync('./events/client').filter(file => file.endsWith('.js'));

    for (const file of events) {
        const event = require(`../events/client/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
    
    console.log(`Loaded ${events.length} DJS Events!`);
}
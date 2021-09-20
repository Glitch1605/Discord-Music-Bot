module.exports = {
    name: "ready",
    async execute (client) {
        console.log(`${client.user.username} Is Now Online`)
        client.manager.init(client.user.id);
    }
}
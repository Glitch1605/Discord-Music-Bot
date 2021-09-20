module.exports = {
    name: "raw",
    async execute(client, d) {
        client.manager.updateVoiceState(d)
    }
}
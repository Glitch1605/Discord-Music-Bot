module.exports = {
    name: "nodeReconnect",
    async execute (client, node) {
        console.log(`Node ${node.options.identifier} Reconnected`);
    }
}
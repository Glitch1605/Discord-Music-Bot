module.exports = {
    name: "nodeDisconnect",
    async execute (client, node) {
        console.log(`Node ${node.options.identifier} Disconnected`);
    }
}
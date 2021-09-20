module.exports = {
    name: "nodeDestroy",
    async execute (client, node) {
        console.log(`Node ${node.options.identifier} was Destroyed`);
    }
}
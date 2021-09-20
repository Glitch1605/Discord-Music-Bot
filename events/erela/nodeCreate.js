module.exports = {
    name: "nodeCreate",
    async execute (client, node) {
        console.log(`Node ${node.options.identifier} was Created`);
    }
}
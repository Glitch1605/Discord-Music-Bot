module.exports = {
    name: "nodeConnect",
    async execute (client, node) {
        console.log(`Node ${node.options.identifier} Connected`)
    }
}
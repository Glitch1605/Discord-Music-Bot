const config = require("./config");

module.exports.verification = function Verification() {
    console.log("Starting Config File Verification...");

    if (process.version.slice(1).split('.')[0] < 16) return console.log("Node 16 or higher is required.");
    Object.entries(config).forEach((entrie) => {
        if (entrie[1] instanceof Object) {
            Object.entries(entrie[1]).forEach((secondEntrie) => {
                if (!secondEntrie[1]) return console.log(`No lavalink '${secondEntrie[0]}' found in the config file`) && false
            })
        }
        if (!entrie[1]) return console.log(`No '${entrie[0]}' found in the config file`) && false;
    })
    return true
};
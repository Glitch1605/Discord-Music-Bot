const config = require("./config")

module.exports = () => {
    console.log("Starting Config File Verification...")

    if (process.version.slice(1).split('.')[0] < 16) {
		console.log("Node 16 or higher is required.");
        return false;
	}

    const config = require("./config")

    if (!config.token) {
        console.log("No \'token\' present in the config file");
        return false;
    }

    if (!config.prefix) {
        console.log("No \'prefix\' found in the config file");
        return false;
    }

    if (!config.mongodbURL) {
        console.log("No \'mongodbURL\' found in the config file");
        return false;
    }

    if (!config.lavalink.host) {
        console.log("No lavalink \'host\' found in the config file")
        return false;
    }

    if (!config.lavalink.port) {
        console.log("No lavalink \'port\' found in the config file")
        return false;
    }

    if (!config.lavalink.password) {
        console.log("No lavalink \'password\' found in the config file")
        return false;
    }

    if (!config.clientId) {
        console.log("No \'clientId\' found in the config file");
        return false;
    }

    if (!config.clientSecret) {
        console.log("No \'clientSecret\' found in the config file");
        return false;
    }

    return true;
}
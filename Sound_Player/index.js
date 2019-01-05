// Load up the Bonjour client
const getThoriumAddress = require("./helpers/bonjour");
const getClient = require("./helpers/graphqlClient");
const registerClient = require("./helpers/registerClient");
const startApp = require("./app");

const { soundPlayerId } = require("../config.json")

var graphQLClient;

//clientName
module.exports.clientId = soundPlayerId;
const clientId = soundPlayerId;

console.log("Activating bonjour browser...");
getThoriumAddress()
    .then(({ address, port, name }) => {
        graphQLClient = getClient(address, port, clientId);
        console.log("Found Thorium server:");
        console.log(`Address: ${address}:${port} ${name}`);

        startApp(address, port, clientId);
    })
    .catch(err => {
        console.error("An error occured");
        console.error(err);
    });



const { EventEmitter } = require("events");
const App = new EventEmitter();
const getClient = require("../helpers/graphqlClient");
const registerClient = require("../helpers/registerClient");

module.exports = async (address, port, clientId) => {
  console.log("Starting app...");

  // Create the client singleton
  getClient(address, port, clientId);

  // Register this app with Thorium as a client
  await registerClient();

  console.log("Registered Client");

  // Grab the client object to instantiate it
  const client = require("./client");

  App.on("clientChange", clientObj => {

    console.log("CLIENT CHANGE!!!!");
    console.log(clientObj);
    console.log("Probably all we want to do right here is get the assigned keyboard ID, and then add that to our query string...")

    // Do something with the client when it changes.
    // For example, start or stop performing actions when a simulator is assigned or unassigned
  });
  
};

module.exports.App = App;

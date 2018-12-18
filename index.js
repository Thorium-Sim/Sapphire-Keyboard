/*
// Load up the Bonjour client
const getThoriumAddress = require("./helpers/bonjour");
const { getClient } = require("./helpers/graphqlClient");
const registerClient = require("./helpers/registerClient");
const startApp = require("./app");

// Override this with the specific name of the client you want to run.
let clientId = "Quartz Keyboard";
module.exports.clientId = clientId;

console.log("Activating bonjour browser...");
getThoriumAddress()
    .then(({ address, port, name }) => {
        console.log("Found Thorium server:");
        console.log(`Address: ${address}:${port}`);

        startApp(address, port, clientId);
    })
    .catch(err => {
        console.error("An error occured");
        console.error(err);
    });

*/



const ioHook = require('iohook');

ioHook.on('keydown', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
    return "";
});
/*
ioHook.on('keyup', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});
*/
/*
ioHook.on('mouseclick', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

ioHook.on('mousedown', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

ioHook.on('mouseup', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

ioHook.on('mousemove', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

ioHook.on('mousedrag', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

ioHook.on('mousewheel', event => {
    console.log(event); // { type: 'mousemove', x: 700, y: 400 }
});

*/

// Register and start hook
ioHook.start(true);

// Alternatively, pass true to start in DEBUG mode.
//ioHook.start(true);




/*

mutation TriggerKeyAction(
    $simulatorId: ID!
    $id: ID!
    $key: String!
    $meta: [String] !
) {
    triggerKeyboardAction(
        simulatorId: $simulatorId id: $id key: $key meta: $meta
    )
}
*/
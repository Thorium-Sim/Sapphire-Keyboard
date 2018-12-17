const getClient = require("./graphqlClient");
const availableCards = ["Test Screen"];

module.exports = function() {
    const client = getClient();
    const tempclient = getClient();

    function deregister() {
        console.log("Shutting down server...");
        client.query({
                query: `
mutation RemoveClient($id: ID!) {
  clientDisconnect(client: $id)
}
`,
                variables: { id: client.clientId }
            })
            .then(() => {
                console.log("Client unregistered.");
                process.exit();
                return 0;
            });
    }
    process.on("SIGINT", deregister);

    client.query({
        query: `
query Keyboard {
  keyboard {
    name
  }
}
`
    }).then(({ data }) => {
        for (let x = 0; x < data.keyboard.length; x++) {
            //console.log(data.keyboard[x].name);
            availableCards.push(data.keyboard[x].name)
        }

        client.query({
                query: `
mutation RegisterClient($client: ID!, $cards: [String]) {
  clientConnect(client: $client, mobile: false, cards: $cards)
}
`,
                variables: { client: client.clientId, cards: availableCards }
            })
            .then(() => client);

    });



};
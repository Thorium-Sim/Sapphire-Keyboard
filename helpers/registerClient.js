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







    const QUERY = `
query Keyboard {
  keyboard {
    name
    id
  }
}
`;
    tempclient.query({
            query: QUERY
        })
        .then(
            ({
                data: { simulators }
            }) => {
                console.log(simulators);
                console.log(tempclient);
                /*
                const { ambiance } = simulators[0];
                ambiance.forEach(a => {
                    this.props.playSound({
                        ...a,
                        looping: true,
                        ambiance: true
                    });
                });
                */
            }
        );


    return client.query({
            query: `
mutation RegisterClient($client: ID!, $cards: [String]) {
  clientConnect(client: $client, mobile: false, cards: $cards)
}
`,
            variables: { client: client.clientId, cards: availableCards }
        })
        .then(() => client);
};
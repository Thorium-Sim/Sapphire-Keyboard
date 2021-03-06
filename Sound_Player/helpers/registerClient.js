const getClient = require("./graphqlClient");
const availableCards = ["Sound"];

module.exports = function() {
  const client = getClient();
  function deregister() {
    console.log("STOP SERVICE");
    console.log("Shutting down server...");
    client
      .query({
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
  return client
    .query({
      query: `
        mutation RegisterClient($client: ID!, $cards: [String]) {
          clientConnect(client: $client, mobile: true, cards: $cards)
        }
      `,
      variables: { client: client.clientId, cards: availableCards }
    })
    .then(() => client);
};

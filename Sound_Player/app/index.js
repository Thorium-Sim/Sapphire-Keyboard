const { EventEmitter } = require("events");
const App = new EventEmitter();
const getClient = require("../helpers/graphqlClient");
const registerClient = require("../helpers/registerClient");
const gql = require("graphql-tag");

const SOUND_SUB = gql`
  subscription SoundSub($clientId: ID!) {
    soundSub(clientId: $clientId) {
      id
      url
      asset
      volume
      playbackRate
      channel
      looping
    }
  }
`;

const CANCEL_SOUNDS = gql`
  subscription CancelSounds($clientId: ID!) {
    cancelSound(clientId: $clientId)
  }
`;

const CANCEL_ALL_SOUNDS = gql`
  subscription CancelSounds($clientId: ID!) {
    cancelAllSounds(clientId: $clientId)
  }
`;

const STOP_LOOPING = gql`
  subscription CancelLooping($clientId: ID!) {
    cancelLoopingSounds(clientId: $clientId)
  }
`;

const AMBIENCE = gql`
  query Ambiance($id: String!) {
    simulators(id: $id) {
      id
      ambiance {
        id
        name
        asset
        volume
        channel
        playbackRate
      }
    }
  }
`;







module.exports = (address, port, clientId) => {
    console.log("Starting app...");

    // Create the client singleton
    getClient(address, port, clientId);

    // Register this app with Thorium as a client
    registerClient();

    console.log("Registered Client");

    // Grab the client object to instantiate it
    const client = require("./client");

    App.on("clientChange", clientObj => {
console.log(clientObj);

        const graphQLClient = getClient();

        if (clientObj.station.name == "Sound" || clientObj.station.name == "Ambience Only") {
	//AMBIENCE Subscription
	    let id = clientObj.simulator.id;
	    graphQLClient
      		.query({ query: AMBIENCE, variables: { id } })
      		.then(({ data }) => {
		    console.log("AMBIENCE");
		    console.log(data);
		});
	}

        if (clientObj.station.name == "Sound" || clientObj.station.name == "SFX Only") {
console.log("check");
	//Sounds Subscription
            graphQLClient
                .subscribe({
                    query: SOUND_SUB,
                    variables: { clientId }
                })
                .then(observable => {
                    observable.subscribe(
                        ({
                            data
                        }) => {
                            console.log("MEH!");
                            console.log(data);
                        },
                        error => {
                            console.log("Error: ", error);
                        }
                    );
                })
                .catch(err => console.error(err));
	//CANCEL_SOUNDS Subscription
            graphQLClient
                .subscribe({
                    query: CANCEL_SOUNDS,
                    variables: { clientId }
                })
                .then(observable => {
                    observable.subscribe(
                        ({
                            data
                        }) => {
                            console.log("CANCEL_SOUNDS");
                            console.log(data);
                        },
                        error => {
                            console.log("Error: ", error);
                        }
                    );
                })
                .catch(err => console.error(err));
	//CANCEL_ALL_SOUNDS Subscription
            graphQLClient
                .subscribe({
                    query: CANCEL_ALL_SOUNDS,
                    variables: { clientId }
                })
                .then(observable => {
                    observable.subscribe(
                        ({
                            data
                        }) => {
                            console.log("CANCEL_ALL_SOUNDS");
                            console.log(data);
                        },
                        error => {
                            console.log("Error: ", error);
                        }
                    );
                })
                .catch(err => console.error(err));
	//STOP_LOOPING Subscription
            graphQLClient
                .subscribe({
                    query: STOP_LOOPING,
                    variables: { clientId }
                })
                .then(observable => {
                    observable.subscribe(
                        ({
                            data
                        }) => {
                            console.log("STOP_LOOPING");
                            console.log(data);
                        },
                        error => {
                            console.log("Error: ", error);
                        }
                    );
                })
                .catch(err => console.error(err));
        }
    });
};
module.exports.App = App;

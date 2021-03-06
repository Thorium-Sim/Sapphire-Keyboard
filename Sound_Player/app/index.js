const { EventEmitter } = require("events");
const App = new EventEmitter();
const getClient = require("../helpers/graphqlClient");
const registerClient = require("../helpers/registerClient");
const gql = require("graphql-tag");
const fs = require('fs')
const fetch = require('node-fetch');
const wavFileInfo = require('wav-file-info');
var shell = require('shelljs');

const { useSFX } = require("../../config.json")
const { useAmbience } = require("../../config.json")

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




var loopingSounds = {};
var currentStation = "";

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
	if (clientObj.station.name != currentStation) {
	currentStation = clientObj.station.name;

        const graphQLClient = getClient();

        if (useAmbience) {
	//AMBIENCE Subscription
	    let id = clientObj.simulator.id;
	    graphQLClient
      		.query({ query: AMBIENCE, variables: { id } })
      		.then(({ data }) => {
		    console.log("AMBIENCE");
//		    console.log(data);
//Repeat through all ambience tracks
//check to see if we have them cached in the system
//if they are not cached, then download them from the server, and cache them
//Once we have them, then play them on loop
		});
	}

        if (useSFX) {
console.log("START SERVICE");
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
			    let urlToGet = ("http://" + address + ":" + port + "/assets" + data.soundSub.asset);
			    let localFile = ("/usr/local/quartz-hardware/Sound_Player" + data.soundSub.asset);
			    try {
			      if (fs.existsSync(localFile)) {
//console.log(data);
				if (data.soundSub.looping) {
				    loopingSounds[data.soundSub.id] = true;
				}
	                        sendPlaySound(data.soundSub.asset,data.soundSub.volume,data.soundSub.playbackRate,data.soundSub.looping,data.soundSub.id);
				//console.log("FILE EXISTS!");
			      } else {
				//console.log("PULL FILE!");
				fetch(urlToGet)
			 	    .then(res => res.buffer())
			            .then(buffer => fs.writeFileSync(localFile,buffer,"binary"))
				    .then(meh => sendPlaySound(data.soundSub.asset,data.soundSub.volume,data.soundSub.playbackRate,data.soundSub.looping,data.soundSub.id))
			   	    .catch(err => console.error(err));

			      }
			    } catch(err) {
			      console.error(err)
			    }
//data.soundSub.volume
//data.soundSub.looping
//data.soundSub.playbackRate
//"../Cached_Sounds" + data.asset
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
			    delete loopingSounds[data.cancelSound];
//                            console.log("CANCEL_SOUNDS");
//                            console.log(data);
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
for (let key in loopingSounds) {
	delete loopingSounds[key];
}
shell.exec('pkill aplay')
//                            console.log("CANCEL_ALL_SOUNDS");
                            //console.log(data);
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
for (let key in loopingSounds) {
	delete loopingSounds[key];
}
//                            console.log("STOP_LOOPING");
                            //console.log(data);
                        },
                        error => {
                            console.log("Error: ", error);
                        }
                    );
                })
                .catch(err => console.error(err));
        }
	}
    });
};
module.exports.App = App;


function sendPlaySound(filePath,vol,playRate,looping,soundId) {
    if (looping == true && !loopingSounds[soundId]) {
//        console.log(filePath);
    } else {
        console.log(filePath);
    }

    if (looping == true && loopingSounds[soundId]) {
	let loopDuration = 0;
        try {
	  wavFileInfo.infoByFilename(("/usr/local/quartz-hardware/Sound_Player" + filePath + ".wav"), function(err, info){
	    if (err) {
	      loopDuration = 1000;
	    } else {
	      loopDuration = info.duration * 1000;
	    }
	    setTimeout(function() { sendPlaySound(filePath,vol,playRate,looping,soundId); }, loopDuration);
	  });
	} catch(err) {
//	  console.error(err);
//	  setTimeout(function() { sendPlaySound(filePath,vol,playRate,looping); }, 1000);
	}
    }
}

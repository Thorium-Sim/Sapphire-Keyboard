#!/bin/bash

cd ./Sound_Player
npm start | ./sound_player.sh &

cd ../Keyboard_Input
echo "Found Devices:"
keyboards="$(./find_keyboards.py)"
./compiled_capture_key.a $keyboards | tee | node ./index.js
# > program.log



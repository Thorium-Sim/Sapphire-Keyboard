#!/bin/bash

#rm program.log

cd ./Keyboard_Input
echo "Found Devices:"
keyboards="$(./find_keyboards.py)"
./capture_key.a $keyboards | tee | node ./index.js
# > program.log

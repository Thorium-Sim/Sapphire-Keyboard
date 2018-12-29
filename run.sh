#!/bin/bash

rm program.log
echo "Found Devices:"
keyboards="$(./find_keyboards.py)"
./capture_key.a $keyboards | tee | node ./index.js
# > program.log

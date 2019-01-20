#!/bin/bash

echo "Found Devices:"
keyboards="$(./find_keyboards.py)"
./compiled_capture_key.a $keyboards | tee | node ./index.js

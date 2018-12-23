#!/bin/bash

echo "Found Devices:"
#./find_keyboards.py>keyboards
keyboards="$(./find_keyboards.py)"
./capture_key.a $keyboards

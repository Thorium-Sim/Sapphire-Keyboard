#!/bin/bash

### General Setup ###
#setup on off switch here: https://www.google.com/search?client=safari&rls=en&q=raspberry+pi+on+switch&ie=UTF-8&oe=UTF-8
#Install Node Here: https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/  -AND-  https://nodejs.org/en/download/
#put everything into startup scripts: https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/

apt install sox

apt install vorbis-tools

#Make the run file executable
chmod 755 ./run.sh

#Make the run file executable
chmod 755 ./test-speakers.sh

#Force the audio output through the headphone jack
amixer cset numid=3 1


### install set up Keyboard_Input ###
cd ./Keyboard_Input

#make our other files executable
chmod 755 ./find_keyboards.py
chmod 755 ./start.sh

#compile the c programming
gcc capture_key.c -o "compiled_capture_key.a"

#install node dependancies
npm install

cd ../



### install set up Sound_Player ###
cd ./Sound_Player

#make our other files executable
chmod 755 ./clear_sound_cache.sh
chmod 755 ./start.sh

#install node dependancies
npm install

cd ../


echo "DONE!"


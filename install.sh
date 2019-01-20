#!/bin/bash

### General Setup ###
#Install Node
cd ~
curl https://nodejs.org/dist/v10.15.0/node-v10.15.0-linux-armv6l.tar.xz
tar -xzf node-v8.9.0-linux-armv6l.tar.gz
cd node-v6.11.1-linux-armv6l/
sudo cp -R * /usr/local/
node -v
npm -v

#install sound dependancies
apt install sox

apt install vorbis-tools

#Make the run file executable
chmod 755 ./run.sh

#Make the run file executable
chmod 755 ./test-speakers.sh

#Force the audio output through the headphone jack
amixer cset numid=3 1


### install set up Keyboard_Input ###
cd ~/quartz-hardware/Keyboard_Input

#make our other files executable
chmod 755 ./find_keyboards.py
chmod 755 ./start.sh

#compile the c programming
gcc capture_key.c -o "compiled_capture_key.a"

#install node dependancies
npm install



### install set up Sound_Player ###
cd ../Sound_Player

#make our other files executable
chmod 755 ./clear_sound_cache.sh
chmod 755 ./start.sh

#install node dependancies
npm install

cd ../

#setup on off switch here: https://howchoo.com/g/mwnlytk3zmm/how-to-add-a-power-button-to-your-raspberry-pi
#sudo cp ./listen-for-shutdown.py /usr/local/bin/
sudo chmod +x /usr/local/bin/listen-for-shutdown.py

echo "To set up the start up scripts, please add:"
echo "~/quartz-hardware/listen-for-shutdown.py &"
echo "~/quartz-hardware/run.sh &"
echo "above 'echo 0' in"
echo "sudo nano /etc/rc.local"

echo "DONE!"

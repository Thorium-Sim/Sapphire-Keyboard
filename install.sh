#!/bin/bash

sudo cp ../sapphire-keyboard /usr/local/
cd /usr/local/sapphire-keyboard/





### General Setup ###
#Install Node
echo "Installing Node"
echo "Downloading Node"
wget -v https://nodejs.org/dist/v10.15.0/node-v10.15.0-linux-armv6l.tar.xz
echo "Unpacking Node"
tar -xf node-v10.15.0-linux-armv6l.tar.xz
cd node-v10.15.0-linux-armv6l
echo "Copying Node Files"
sudo cp -R * /usr/local/
echo "Testing Node"
node -v
npm -v
cd /usr/local/sapphire-keyboard/
yes | sudo rm -r ./node-v10.15.0-linux-armv6l*

#install sound dependancies
echo "installing sox"
yes | sudo apt install sox

echo "installing vorbis-tools"
yes | sudo apt install vorbis-tools

cd /usr/local/sapphire-keyboard/

echo "making files executable"
#Make the run file executable
chmod 755 ./run.sh

#Make the run file executable
chmod 755 ./test-speakers.sh

echo "forcing audio through headphone jack"
#Force the audio output through the headphone jack
amixer cset numid=3 1

echo "setting up keyboard input"
### install set up Keyboard_Input ###
cd /usr/local/sapphire-keyboard/Keyboard_Input

#make our other files executable
chmod 755 ./find_keyboards.py
chmod 755 ./start.sh

#compile the c programming
gcc capture_key.c -o "compiled_capture_key.a"

#install node dependancies
npm install


echo "setting up Sound Player"
### install set up Sound_Player ###
cd ../Sound_Player
mkdir ./Sounds/

#make our other files executable
chmod 755 ./clear_sound_cache.sh
chmod 755 ./start.sh

#install node dependancies
npm install

cd ../

echo "Setting up shutdown scripts"
#setup on off switch here: https://howchoo.com/g/mwnlytk3zmm/how-to-add-a-power-button-to-your-raspberry-pi


cd /usr/local/sapphire-keyboard/


sudo chmod +x ./listen-for-shutdown.py
sudo mv ./listen-for-shutdown.sh /etc/init.d/
sudo chmod +x /etc/init.d/listen-for-shutdown.sh
sudo update-rc.d listen-for-shutdown.sh defaults
#sudo /etc/init.d/listen-for-shutdown.sh start



sudo chmod +x ./run.sh
sudo mv ./start-sound-clients.sh /etc/init.d/
sudo chmod +x /etc/init.d/start-sound-clients.sh
sudo update-rc.d start-sound-clients.sh defaults
#sudo /etc/init.d/start-sound-clients.sh start


sudo update-rc.d -f listen-for-shutdown.sh default
sudo update-rc.d -f start-sound-clients.sh default


sudo rm -r ~/sapphire-keyboard

echo "DONE!  Please reboot to start the sound player"

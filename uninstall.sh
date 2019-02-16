#!/bin/bash

sudo rm -r ~/node*

yes | sudo apt remove sox
yes | sudo apt remove vorbis-tools


sudo update-rc.d -f listen-for-shutdown.sh stop
sudo update-rc.d -f start-sound-clients.sh stop
sudo update-rc.d -f listen-for-shutdown.sh remove
sudo update-rc.d -f start-sound-clients.sh remove

amixer cset numid=3 0

sudo rm -r /usr/local/sapphire-keyboard/

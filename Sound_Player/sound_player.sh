#!/bin/bash

echo "Waiting for START SERVICE"
while [ "$varname" != "START SERVICE" ];
do
	read varname
	echo $varname
done

echo "Started Service.  Wating for for STOP SERVICE"

read varname

while [ "$varname" != "STOP SERVICE" ];
do
	echo "/usr/local/quartz-hardware/Sound_Player$varname" &
	#High Latency, but can play multiple files at once, but not very many at the same time
#	ogg123 "/usr/local/quartz-hardware/Sound_Player/Sounds$varname" & #High Latency, but can play multiple files at once

	#Low Latency, but can't play many files at once
#	play "/usr/local/quartz-hardware/Sound_Player$varname" & #Low Latency, but can't play many files at once

	#Low latency, and can play multiple files at once, but not very many at the same time
	if [ -f "/usr/local/quartz-hardware/Sound_Player$varname.wav" ]; then
		echo "File /usr/local/quartz-hardware/Sound_Player$varname.wav exists."
	else
		echo "File /usr/local/quartz-hardware/Sound_Player$varname.wav does not exist."
		sox "/usr/local/quartz-hardware/Sound_Player$varname" "/usr/local/quartz-hardware/Sound_Player$varname.wav"
	fi
	aplay "/usr/local/quartz-hardware/Sound_Player$varname.wav" &

	read varname
done

echo "Service Stopped"

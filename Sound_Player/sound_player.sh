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
	echo ".$varname" &
	#High Latency, but can play multiple files at once, but not very many at the same time
#	ogg123 ".$varname" & #High Latency, but can play multiple files at once

	#Low Latency, but can't play many files at once
#	play ".$varname" & #Low Latency, but can't play many files at once

	#Low latency, and can play multiple files at once, but not very many at the same time
	if [ -f ".$varname.wav" ]; then
		echo "File .$varname.wav exists."
	else
		echo "File .$varname.wav does not exist."
		sox ".$varname" ".$varname.wav"
	fi
	aplay ".$varname.wav" &

	read varname
done

echo "Service Stopped"

#!/bin/bash

#setup on off switch here: https://www.google.com/search?client=safari&rls=en&q=raspberry+pi+on+switch&ie=UTF-8&oe=UTF-8
#Install Node Here: https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/  -AND-  https://nodejs.org/en/download/
#npm Install here
#put everything into startup scripts: https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/

#make our other files executable
chmod 755 run.sh
chmod 755 find_keyboards.py

#compile the c programming
gcc capture_key.c -o "capture_key.a"

echo "DONE!"

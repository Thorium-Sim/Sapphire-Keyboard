#! /bin/sh

### BEGIN INIT INFO
# Provides:          run.sh
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO

# If you want a command to always run, put it here

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting sound client (run.sh)"
#    node /usr/local/quartz-hardware/Sound_Player/index.js | /usr/local/quartz-hardware/Sound_Player/sound_player.sh &
    (sleep 30 && node /usr/local/quartz-hardware/Sound_Player/index.js | /usr/local/quartz-hardware/Sound_Player/sound_player.sh) &
    keyboards="$(/usr/local/quartz-hardware/Keyboard_Input/find_keyboards.py)"
    (sleep 30 && /usr/local/quartz-hardware/Keyboard_Input/compiled_capture_key.a $keyboards | tee | node /usr/local/quartz-hardware/Keyboard_Input/index.js) &
    #/usr/local/quartz-hardware/run.sh &
    ;;
  startnow)
    echo "Starting sound client (run.sh)"
#    node /usr/local/quartz-hardware/Sound_Player/index.js | /usr/local/quartz-hardware/Sound_Player/sound_player.sh &
    (node /usr/local/quartz-hardware/Sound_Player/index.js | /usr/local/quartz-hardware/Sound_Player/sound_player.sh) &
    keyboards="$(/usr/local/quartz-hardware/Keyboard_Input/find_keyboards.py)"
    (/usr/local/quartz-hardware/Keyboard_Input/compiled_capture_key.a $keyboards | tee | node /usr/local/quartz-hardware/Keyboard_Input/index.js) &
    #/usr/local/quartz-hardware/run.sh &
    ;;
  stop)
    echo "Stopping sound client (run.sh)"
    sudo pkill -2 -f /usr/local/quartz-hardware/Sound_Player/index.js
    sudo pkill -2 -f /usr/local/quartz-hardware/Keyboard_Input/index.js
#    sudo pkill -2 -f /usr/local/quartz-hardware/Keyboard_Input/compiled_capture_key.a
    #pkill -f /usr/local/quartz-hardware/run.sh
    ;;
  *)
    echo "Usage: /etc/init.d/start-sound-clients.sh {start|stop}"
    exit 1
    ;;
esac

exit 0

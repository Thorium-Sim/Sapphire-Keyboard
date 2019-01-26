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
    /usr/local/quartz-hardware/run.sh &
    ;;
  stop)
    echo "Stopping sound client (run.sh)"
    pkill -f /usr/local/quartz-hardware/run.sh
    ;;
  *)
    echo "Usage: /etc/init.d/start-sond-clients.sh {start|stop}"
    exit 1
    ;;
esac

exit 0

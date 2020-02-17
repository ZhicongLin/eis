#!/bin/sh
PID=$(cat /var/run/eis.pid)
kill -9 $PID

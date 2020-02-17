#!/bin/sh

java -jar /usr/local/webservice/eis-web-1.0-SNAPSHOT.jar > /usr/local/webservice/logs/eis.log &
echo $! > /var/run/eis.pid

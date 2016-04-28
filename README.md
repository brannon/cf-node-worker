cf-node-worker
==============

Simple example of a node worker app in CloudFoundry v2.

## Configuration

Use the `PERIODIC_INTERVAL` env var to control the interval (in seconds).

## Deploying to CF

`cf push <APPNAME> -p <PATH> --no-route`

To set a 5 minute interval:

`cf set-env <APPNAME> PERIODIC_INTERVAL 300`

To see logs in real-time:

`cf logs <APPNAME>`

Or recent logs:

`cf logs <APPNAME> --recent`

##

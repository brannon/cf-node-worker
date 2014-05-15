
var os = require('os'),
    net = require('net');

function getConfig() {
    return {
        interval: parseInt(process.env.PERIODIC_INTERVAL || 60) * 1000,
        port: parseInt(process.env.PORT || 0),
    }
}

console.log('node-worker starting up.');
console.log('- Process Environment:');
console.dir(process.env);

process.on('exit', function (code) {
    console.log('node-worker exiting (with code ' + code + ').');
});

var config = getConfig();

//
// Listen for health check if necessary
//
if (config.port) {
    var server = new net.createServer(function (c) {
        console.log('Received health check: "' + c.read() + '".');
        c.write('hello\r\n');
        c.end();
        process.nextTick(function() { server.close(); });
    });
    server.listen(config.port);
}

//
// Run a periodic task
//
setInterval(function() {
    var pid = process.pid,
        uptime = process.uptime(),
        hostname = os.hostname(),
        time = new Date();

    console.log('node-worker running periodic task at ' + time.toTimeString());
    console.log(' - Process ID: ' + pid);
    console.log(' - Uptime: ' + uptime + ' seconds');
    console.log(' - DEA Hostname: ' + hostname);

}, config.interval);

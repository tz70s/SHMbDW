var os = require('os-utils');
var redis = require('redis');

os.cpuUsage(function(v) {
	
});

var os_client = redis.createClient('6378', '127.0.0.1');

os_client.on('error', function(error) {
	console.log(error);
});

var usage = 0;
setInterval(function() {
	os.cpuUsage(function(v) {
		usage = v*100;
		usage = Number(usage.toFixed(1));
		console.log(usage);
	});
	os_client.set('usage',usage,redis.print);
},1000);

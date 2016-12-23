var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO
var os = require('os');

var server = http.createServer(function(request, response) {
	console.log('Connection');
	var path = url.parse(request.url).pathname;

	switch (path) {
			    case '/':
			    	fs.readFile('index.html', function(error, data) {
					if (error){
						response.writeHead(404);
					    response.write("opps this doesn't exist - 404");    
					} else {
					    response.writeHead(200, {"Content-Type": "text/html"});
					    response.write(data, "utf8");
					}
				    response.end();
					});
			      	break;
			    default:
			      response.writeHead(404);
			      response.write("opps this doesn't exist - 404");
			      response.end();
			      break;
			  
	}

});

server.listen(8080);

var serv_io = io.listen(server);

serv_io.sockets.on('connection', function(socket) {
	setInterval(function() {
		socket.emit('message', {'message': 'linux', 'date': new Date(), 'load': os.loadavg()[0]});
	}, 1000);
});

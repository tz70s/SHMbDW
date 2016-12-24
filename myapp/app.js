var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);

server.listen(8080, function() {
	console.log('start listen');
});

var io = require('socket.io');
var redis = require('redis');

var serv_io = io.listen(server);

var dinning_client = redis.createClient('6378', '127.0.0.1');
var kitchen_client = redis.createClient('6379', '127.0.0.1');

dinning_client.on('error', function(error) {
	console.log(error);	
});

kitchen_client.on('error', function(error) {
	console.log(error);	
});

var dinning_temp, dinning_humi, dinning_cpu;
var kitchen_temp, kitchen_humi, kitchen_cpu;

serv_io.sockets.on('connection', function(socket) {
	setInterval(function() {
		dinning_client.get('temperature',function(err,reply) {
			dinning_temp = reply;
		});
		dinning_client.get('humidity', function(err, reply) {
			dinning_humi = reply;
		});
		dinning_client.get('usage', function(err, reply) {
			dinning_cpu = reply;
		})
		kitchen_client.get('temperature', function(err,reply){
			kitchen_temp = reply;
		});
		kitchen_client.get('humidity', function(err,reply) {
			kitchen_humi = reply;
		});
		kitchen_client.get('usage', function(err,reply) {
			kitchen_cpu = reply;
		});

		socket.emit('message', {'dinning_temp': dinning_temp, 'dinning_humi': dinning_humi, 'dinning_cpu': dinning_cpu, 'kitchen_temp': kitchen_temp, 'kitchen_humi': kitchen_humi, 'kitchen_cpu': kitchen_cpu});
	}, 500);
});

module.exports = app;

var express = require('express');
var app = express();
module.exports = app;
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', path.join(__dirname, 'views'));

var indexRoutes = require('./routes/index');
var chatRoutes = require('./routes/chat');
app.use('/', indexRoutes);
app.use('/chat/', chatRoutes);


app.use(express.static(path.join(__dirname, 'public')));

var nicknames = [];

io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('chat message', function (msg) {
		io.emit('chat message', msg);
	});
	socket.on('set nickname', function (nickname) {
		var existsNickname = false;
		for (var i = 0; i < nicknames.length; i++) {
			if (nicknames[i] == nickname) {
				existsNickname = true;
				break;
			}
		}
		if (!existsNickname) {
			nicknames.push(nickname);
			io.emit('join user', nickname);
		}
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	//socket.broadcast.emit('hi');
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});

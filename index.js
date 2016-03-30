var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

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

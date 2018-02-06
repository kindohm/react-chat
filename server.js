var app = require('express')();
var server = require('http').Server(app);


const io = require('socket.io')(server, {
    path: '/chat',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

server.listen(3001);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log("received data", data);
        socket.s
    });
});
